# S3 Static Website Hosting Guide

## Current Setup Analysis

### SvelteKit Configuration
- **Framework**: SvelteKit with TypeScript
- **Adapter**: `@sveltejs/adapter-auto` (currently defaulting to Node.js)
- **Build Output**: `.svelte-kit/output/client/` (static assets) + `.svelte-kit/output/server/` (SSR)
- **Static Assets**: `static/` folder contains favicon.png, logo files, robots.txt
- **Build Process**: `npm run build` generates both client and server outputs

### Current Issues for S3 Hosting

❌ **Major Gap**: The current setup uses `adapter-auto` which generates SSR (Server-Side Rendering) output, not pure static files. S3 can only serve static files.

## Required Changes for S3 Compatibility

### 1. Switch to Static Adapter

**Replace** `@sveltejs/adapter-auto` with `@sveltejs/adapter-static`:

```bash
npm uninstall @sveltejs/adapter-auto
npm install -D @sveltejs/adapter-static
```

**Update** `svelte.config.js`:
```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    })
  }
};

export default config;
```

### 2. Add Prerendering Configuration

**Create** `src/routes/+layout.ts`:
```typescript
export const prerender = true;
export const trailingSlash = 'ignore';
```

### 3. Handle SPA Routing (if needed)

Since your site has multiple routes (`/solutions`, `/portfolio`, etc.), you'll need to handle client-side routing:

**Option A**: Full prerendering (recommended for SEO)
- All routes will be pre-generated as static HTML files
- Better for SEO and performance
- Each route becomes a separate HTML file

**Option B**: SPA mode with fallback
```javascript
// In svelte.config.js adapter options
adapter: adapter({
  pages: 'build',
  assets: 'build',
  fallback: 'index.html', // SPA fallback
  precompress: false
})
```

### 4. Update Package.json Scripts

```json
{
  "scripts": {
    "build": "vite build",
    "build:static": "vite build && cp -r static/* build/",
    "preview": "vite preview"
  }
}
```

## Terraform Infrastructure Setup

### Required AWS Resources

```hcl
# terraform/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# S3 Bucket for hosting
resource "aws_s3_bucket" "website" {
  bucket = var.domain_name
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website.arn}/*"
      },
    ]
  })
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.website.website_endpoint
    origin_id   = "S3-${var.domain_name}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [var.domain_name, "www.${var.domain_name}"]

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${var.domain_name}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  # Cache behavior for static assets
  ordered_cache_behavior {
    path_pattern     = "/_app/immutable/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.domain_name}"
    compress         = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl                = 31536000  # 1 year
    default_ttl            = 31536000
    max_ttl                = 31536000
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_100"  # Use only North America and Europe

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.website.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 404
    response_page_path = "/404.html"
  }

  # Handle SPA routing
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
}

# ACM Certificate
resource "aws_acm_certificate" "website" {
  provider                  = aws.us_east_1  # CloudFront requires certificates in us-east-1
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "website" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.website.arn
  validation_record_fqdns = [
    for record in aws_route53_record.website_validation : record.fqdn
  ]
}

# Route53 Records
data "aws_route53_zone" "website" {
  name         = var.domain_name
  private_zone = false
}

resource "aws_route53_record" "website_validation" {
  for_each = {
    for dvo in aws_acm_certificate.website.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.website.zone_id
}

resource "aws_route53_record" "website" {
  zone_id = data.aws_route53_zone.website.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "website_www" {
  zone_id = data.aws_route53_zone.website.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
```

### Variables File

```hcl
# terraform/variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain name for the website"
  type        = string
  default     = "zerotoone.solutions"
}
```

### Provider Configuration

```hcl
# terraform/providers.tf
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
```

## Deployment Automation

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to S3

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build static site
      run: npm run build
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Deploy to S3
      run: |
        aws s3 sync build/ s3://${{ vars.DOMAIN_NAME }} --delete
        aws cloudfront create-invalidation --distribution-id ${{ vars.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

## Cost Estimation (Monthly)

### S3 Costs
- **Storage**: ~$0.023/GB (first 50TB)
- **Requests**: ~$0.0004/1000 GET requests
- **Data Transfer**: First 1GB free, then ~$0.09/GB

### CloudFront Costs
- **Data Transfer**: First 1TB free, then ~$0.085/GB
- **Requests**: ~$0.0075/10,000 requests

### Route53 Costs
- **Hosted Zone**: $0.50/month
- **Queries**: First 1B free, then $0.40/million

**Estimated Monthly Cost for Small Website**: $2-10/month

## Implementation Steps

1. **Update SvelteKit Configuration**
   ```bash
   npm uninstall @sveltejs/adapter-auto
   npm install -D @sveltejs/adapter-static
   ```

2. **Test Static Build**
   ```bash
   npm run build
   # Verify build/ directory contains static files
   ```

3. **Initialize Terraform**
   ```bash
   cd terraform
   terraform init
   terraform plan -var="domain_name=zerotoone.solutions"
   terraform apply
   ```

4. **Configure GitHub Secrets**
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `DOMAIN_NAME` (variable)
   - `CLOUDFRONT_DISTRIBUTION_ID` (variable)

5. **Deploy**
   - Push to main branch triggers automatic deployment
   - Manual deployment via GitHub Actions

## Benefits of This Setup

✅ **Cost-Effective**: Minimal monthly costs ($2-10/month)
✅ **High Performance**: CloudFront CDN for global delivery
✅ **Scalable**: Handles traffic spikes automatically  
✅ **Secure**: HTTPS enforced, DDoS protection via CloudFront
✅ **Infrastructure as Code**: Fully reproducible with Terraform
✅ **Automated Deployment**: Push to deploy via GitHub Actions

## Considerations

⚠️ **No Server-Side Features**: Pure static hosting (no server-side API routes)
⚠️ **Client-Side Routing**: SPA routing happens in browser
⚠️ **Build Time**: All pages pre-rendered during build process
