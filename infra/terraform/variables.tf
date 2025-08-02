variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Primary domain name for the website"
  type        = string
  default     = "zerotoone.solutions"
}

variable "additional_domains" {
  description = "Additional domains that should point to the same website"
  type        = list(string)
  default     = []
  # default     = ["zero-to-one.eu","brabanconne.solutions","brabanconne.io", "romdj.xyz"]
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}
