output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for cache invalidation"
  value       = aws_cloudfront_distribution.website.id
}

output "s3_bucket_name" {
  description = "S3 bucket name for file uploads"
  value       = aws_s3_bucket.website.bucket
}

output "website_urls" {
  description = "All website URLs"
  value = {
    primary = "https://${var.domain_name}"
    additional = [for domain in var.additional_domains : "https://${domain}"]
  }
}