# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/romdj/zerotoone.solutions/compare/v1.0.5...v1.1.0) (2025-08-09)


### ⚡ Performance Improvements

* optimize CI test execution for faster pipeline ([9c07be2](https://github.com/romdj/zerotoone.solutions/commit/9c07be2d6f8176a139cd0e46776ab2dae07f4316))


### 📚 Documentation

* add Pulumi documentation and deprecate Terraform workflow ([f30dd05](https://github.com/romdj/zerotoone.solutions/commit/f30dd0575fb572ad09258661873cc836a5c50470))


### 🐛 Bug Fixes

* add CloudFront distribution import handling to deployment pipeline ([2a2722f](https://github.com/romdj/zerotoone.solutions/commit/2a2722fddf9fff7d4f089168653f7457f376fd03))
* add PULUMI_ACCESS_TOKEN to all Pulumi workflow steps ([ae0d228](https://github.com/romdj/zerotoone.solutions/commit/ae0d22831fb79ddbb579633511fd829eec991802))
* add Route53 record import handling to complete deployment pipeline ([f715231](https://github.com/romdj/zerotoone.solutions/commit/f7152310dd289c6c005b7ae6197295b46b5c4eca))
* correct Pulumi GitHub Action usage ([d58b4b2](https://github.com/romdj/zerotoone.solutions/commit/d58b4b229f9d05c6f4f2c36786d32299504f6734))
* improve Route53 record detection and import logic ([3846b44](https://github.com/romdj/zerotoone.solutions/commit/3846b4431de1e1fbc16aa495a001818dbd1540e6))
* improve terraform import logic to avoid ACM dependency issues ([5e4e52e](https://github.com/romdj/zerotoone.solutions/commit/5e4e52e326853ea924d29df2eca1c966d98f8584))
* properly handle terraform apply failures in CI pipeline ([53305c9](https://github.com/romdj/zerotoone.solutions/commit/53305c9bb4e62c73b6a4e605146a2be8e98c74f6))
* remove aws:region from static config files ([429a24b](https://github.com/romdj/zerotoone.solutions/commit/429a24ba3ba8dba4353623e7d91adaf9d856ffd8))
* remove invalid default value for aws:region config ([e273326](https://github.com/romdj/zerotoone.solutions/commit/e2733267d49946651eddfc3b73e8c6c30f37a7af))
* removed pulumi secrets in the pipeline ([5535645](https://github.com/romdj/zerotoone.solutions/commit/553564507d148afa24d6cce547c8b676b59c32e5))
* resolve terraform import and dependency issues ([d7b5856](https://github.com/romdj/zerotoone.solutions/commit/d7b5856eb04065dd8a822f55513971a2df3c4761))
* use correct Pulumi GitHub Action version ([e974c3e](https://github.com/romdj/zerotoone.solutions/commit/e974c3eba562524317b3c8750e7ce726d9bd4a3a))
* use targeted terraform apply to resolve ACM certificate dependency issue ([eb4be45](https://github.com/romdj/zerotoone.solutions/commit/eb4be454e6b6e951d86fa096d9627394ad67798b))


### 🔧 Chores

* clean up Terraform references and rename deployment workflow ([4116dc4](https://github.com/romdj/zerotoone.solutions/commit/4116dc40a755366185d096e6eb1a10fb420082e9))
* remove Terraform infrastructure files ([2619fba](https://github.com/romdj/zerotoone.solutions/commit/2619fba3aea458c2ea43cc7fb500a26fad4d73db))


### ✨ Features

* add Pulumi deployment validation and fix passphrase issue ([28efdff](https://github.com/romdj/zerotoone.solutions/commit/28efdffd55766ee9d628c7d40670e95660efd2a8))
* add responsive navigation component ([6db7b65](https://github.com/romdj/zerotoone.solutions/commit/6db7b652c9f2cb8b5e62d8c4bf9b6ce3c97cf3a9))
* complete clean Pulumi infrastructure with latest versions ([62cd8f5](https://github.com/romdj/zerotoone.solutions/commit/62cd8f54ab3fbbba54a9ac8a25ca83c22ed9f93a))
* finalize Pulumi setup with OIDC authentication and clean validation ([8274e8d](https://github.com/romdj/zerotoone.solutions/commit/8274e8df71c55e1688e67200af3aa00343e91d53))
* migrate from Terraform to Pulumi infrastructure ([e9fb565](https://github.com/romdj/zerotoone.solutions/commit/e9fb5655fb4c8d3a1f69fe9e20a00cdd49f015b6))
* switch from local Pulumi state to Pulumi Cloud OIDC ([4f8d5fe](https://github.com/romdj/zerotoone.solutions/commit/4f8d5fea7018a591a12483bf3dfd9f7bbc4d0e77))


### ♻️ Code Refactoring

* modularize navigation component for better maintainability ([df2c0e3](https://github.com/romdj/zerotoone.solutions/commit/df2c0e3128254d66000007b9f375caf6edca583c))
* simplify portfolio page to focus on side projects only ([3f51494](https://github.com/romdj/zerotoone.solutions/commit/3f5149423f78d00b40374004d62ac9b035ca63a6))

### [1.0.5](https://github.com/romdj/zerotoone.solutions/compare/v1.0.4...v1.0.5) (2025-08-03)


### 🐛 Bug Fixes

* improve terraform resource import logic in deployment pipeline ([7eaee0e](https://github.com/romdj/zerotoone.solutions/commit/7eaee0eb9f1a27e917a3ccb34cd324abca4d80e1))

### [1.0.4](https://github.com/romdj/zerotoone.solutions/compare/v1.0.3...v1.0.4) (2025-08-03)


### 🐛 Bug Fixes

* cicd terraform deployment pipeline ([815aa3d](https://github.com/romdj/zerotoone.solutions/commit/815aa3d9ea9dacc5120242a7486de19701458e97))

### [1.0.3](https://github.com/romdj/zerotoone.solutions/compare/v1.0.2...v1.0.3) (2025-08-03)


### 🐛 Bug Fixes

* skip problematic mobile story expansion tests ([7bef809](https://github.com/romdj/zerotoone.solutions/commit/7bef809d3b7ee36f5f3232c55a34b75ad27776f0))
* update mobile tests to use iPhone 12/13/14 instead of iPhone SE ([576b882](https://github.com/romdj/zerotoone.solutions/commit/576b8827b5ee9b11d8010b364a73e4b72c87d09e))

### [1.0.2](https://github.com/romdj/zerotoone.solutions/compare/v1.0.1...v1.0.2) (2025-08-03)


### 🐛 Bug Fixes

* redesign beer story section with professional monochromatic styling ([98756c1](https://github.com/romdj/zerotoone.solutions/commit/98756c1ae5bbf87a7da0b3518189b8c161bb4568)), closes [#F11759](https://github.com/romdj/zerotoone.solutions/issues/F11759) [#8333C5](https://github.com/romdj/zerotoone.solutions/issues/8333C5) [#D67D21](https://github.com/romdj/zerotoone.solutions/issues/D67D21)

### [1.0.1](https://github.com/romdj/zerotoone.solutions/compare/v1.0.0...v1.0.1) (2025-08-03)


### 🐛 Bug Fixes

* added more padding to the first page slider ([7aa7dca](https://github.com/romdj/zerotoone.solutions/commit/7aa7dca823c666df8650a5a29f16a05b4d376a32))

## 1.0.0 (2025-08-03)


### ⚠ BREAKING CHANGES

* removes separate CI checks, all validation now happens in CD pipeline
* switches from feature branch workflow to trunk-based development

### 🐛 Bug Fixes

* replace company logos with clean SVG versions to eliminate white backgrounds ([4212afb](https://github.com/romdj/zerotoone.solutions/commit/4212afb9821ba6ef7c414ed09bb09e8668311d40))
* update Philips logo to use clean SVG version ([bd4e011](https://github.com/romdj/zerotoone.solutions/commit/bd4e011fa3ec8fad0ad51e27ea79b4eb8653e5f2))


### ✨ Features

* add comprehensive logo asset collection for company branding ([95d2d55](https://github.com/romdj/zerotoone.solutions/commit/95d2d5554120c7935e10949564449dc42ead3312))
* added beer visuals for analogy ([4f824e6](https://github.com/romdj/zerotoone.solutions/commit/4f824e61edf66917adc455b0d5a8d865942f7110))
* added beer visuals for analogy ([534e8ec](https://github.com/romdj/zerotoone.solutions/commit/534e8ece1d64aa8d84a74c5a2c78fd8163b1c70c))
* configure repository for trunk-based development workflow ([98384c6](https://github.com/romdj/zerotoone.solutions/commit/98384c6712faa4e9af891e16d5c6b6eae87e308c))
* enhance homepage storytelling with cohesive narrative arc ([b552e49](https://github.com/romdj/zerotoone.solutions/commit/b552e49b5b05cdb30e5cbae197486c457dd8164f))
* redesign company sections with investor relations design language ([1954f43](https://github.com/romdj/zerotoone.solutions/commit/1954f43b27a4bbd8ea0a30f182145de51d89d090))
* setup automatic changelog generation from conventional commits ([2975d64](https://github.com/romdj/zerotoone.solutions/commit/2975d6489f1721df42771d02ef00921e11bd2ba6))
* streamline ABVV section by removing logo in favor of clean text ([58a54cb](https://github.com/romdj/zerotoone.solutions/commit/58a54cbe3d1b0d2de36633d9cf33a7950a403ccc))
* updated the beer story ([7244bab](https://github.com/romdj/zerotoone.solutions/commit/7244bab66cadb021a4221cf25842a900ea496cbf))
* updated the beer story ([ad9e97b](https://github.com/romdj/zerotoone.solutions/commit/ad9e97beae9b1b8667805df53129ef350694a6e2))


### 🔧 Chores

* added company logos ([4c4ebb6](https://github.com/romdj/zerotoone.solutions/commit/4c4ebb6a88c322b5e1bc3fc74181360059eeb4c0))
* added company svg logos ([13ddea8](https://github.com/romdj/zerotoone.solutions/commit/13ddea802be1506af616d53a69329f6a20f6a90d))
* added configuration and markdown files ([8177bff](https://github.com/romdj/zerotoone.solutions/commit/8177bff15bb272efc5a2928c915df7c074ca5ee0))
* added nike ELC illustrations ([1be1627](https://github.com/romdj/zerotoone.solutions/commit/1be1627e658ec79c9831836e63f7305d179d1c80))
* cleanup of story layout ([d4090a5](https://github.com/romdj/zerotoone.solutions/commit/d4090a58e254847bc77ea8cc2d1c314ccea4b047))
* commenting out additional domain names ([489445c](https://github.com/romdj/zerotoone.solutions/commit/489445c4ec12bff7b616d25e73ff5b876a946995))
* **release:** 0.0.1 ([b8e0d36](https://github.com/romdj/zerotoone.solutions/commit/b8e0d36b6168c31ae9a60a5cbd22954befb51e4a))
* removed deprecated components from pre-push file ([847e30f](https://github.com/romdj/zerotoone.solutions/commit/847e30fb33298ae085c0a3d4f223862f9dcc4b27))
* removed old favicon svg reference ([ac0a1e7](https://github.com/romdj/zerotoone.solutions/commit/ac0a1e792654b341b7c2b71d35fb6f301fa1f206))
* removed style guides from assets ([7e10a56](https://github.com/romdj/zerotoone.solutions/commit/7e10a56b274c08bfec32ae56f14b204de8ff54ac))
* removed style guides from assets ([6c8bd03](https://github.com/romdj/zerotoone.solutions/commit/6c8bd03c4561841003089a9550271d54fdac2abe))
* update package-lock.json after adding versioning dependencies ([34691eb](https://github.com/romdj/zerotoone.solutions/commit/34691ebb06ffce3b73fde24912b6cb7c13f14773))
* updated config for static SPA application build & layout ([a00d6cd](https://github.com/romdj/zerotoone.solutions/commit/a00d6cd884d0344d14edca4a4df8d4da362d8d36))
* updated config for static SPA application build & layout ([0c9569b](https://github.com/romdj/zerotoone.solutions/commit/0c9569b071d774d77436b71243c6cda4291b0b58))
* updated dependencies and configuration ([6006d3d](https://github.com/romdj/zerotoone.solutions/commit/6006d3d70062b2fa8f80d1adb2cb3b50d972908a))
* updated dependencies and configuration ([597942d](https://github.com/romdj/zerotoone.solutions/commit/597942d54517b77f933105d44f9238a5cf36a616))


### ♻️ Code Refactoring

* modularize company sections into reusable components with authentic branding ([18c905f](https://github.com/romdj/zerotoone.solutions/commit/18c905fdc2222789710fd19a33831c1d0f08a47b))
* remove redundant CI workflow and streamline to single CD pipeline ([ea9dce5](https://github.com/romdj/zerotoone.solutions/commit/ea9dce508af22acde417649151d4d13290d058f3))

### 0.0.1 (2025-08-03)


### ♻️ Code Refactoring

* modularize company sections into reusable components with authentic branding ([18c905f](https://github.com/romdj/zerotoone.solutions/commit/18c905fdc2222789710fd19a33831c1d0f08a47b))


### 🔧 Chores

* added company logos ([4c4ebb6](https://github.com/romdj/zerotoone.solutions/commit/4c4ebb6a88c322b5e1bc3fc74181360059eeb4c0))
* added company svg logos ([13ddea8](https://github.com/romdj/zerotoone.solutions/commit/13ddea802be1506af616d53a69329f6a20f6a90d))
* added configuration and markdown files ([8177bff](https://github.com/romdj/zerotoone.solutions/commit/8177bff15bb272efc5a2928c915df7c074ca5ee0))
* added nike ELC illustrations ([1be1627](https://github.com/romdj/zerotoone.solutions/commit/1be1627e658ec79c9831836e63f7305d179d1c80))
* cleanup of story layout ([d4090a5](https://github.com/romdj/zerotoone.solutions/commit/d4090a58e254847bc77ea8cc2d1c314ccea4b047))
* commenting out additional domain names ([489445c](https://github.com/romdj/zerotoone.solutions/commit/489445c4ec12bff7b616d25e73ff5b876a946995))
* removed deprecated components from pre-push file ([847e30f](https://github.com/romdj/zerotoone.solutions/commit/847e30fb33298ae085c0a3d4f223862f9dcc4b27))
* removed old favicon svg reference ([ac0a1e7](https://github.com/romdj/zerotoone.solutions/commit/ac0a1e792654b341b7c2b71d35fb6f301fa1f206))
* removed style guides from assets ([7e10a56](https://github.com/romdj/zerotoone.solutions/commit/7e10a56b274c08bfec32ae56f14b204de8ff54ac))
* removed style guides from assets ([6c8bd03](https://github.com/romdj/zerotoone.solutions/commit/6c8bd03c4561841003089a9550271d54fdac2abe))
* updated config for static SPA application build & layout ([a00d6cd](https://github.com/romdj/zerotoone.solutions/commit/a00d6cd884d0344d14edca4a4df8d4da362d8d36))
* updated config for static SPA application build & layout ([0c9569b](https://github.com/romdj/zerotoone.solutions/commit/0c9569b071d774d77436b71243c6cda4291b0b58))
* updated dependencies and configuration ([6006d3d](https://github.com/romdj/zerotoone.solutions/commit/6006d3d70062b2fa8f80d1adb2cb3b50d972908a))
* updated dependencies and configuration ([597942d](https://github.com/romdj/zerotoone.solutions/commit/597942d54517b77f933105d44f9238a5cf36a616))


### ✨ Features

* add comprehensive logo asset collection for company branding ([95d2d55](https://github.com/romdj/zerotoone.solutions/commit/95d2d5554120c7935e10949564449dc42ead3312))
* added beer visuals for analogy ([4f824e6](https://github.com/romdj/zerotoone.solutions/commit/4f824e61edf66917adc455b0d5a8d865942f7110))
* added beer visuals for analogy ([534e8ec](https://github.com/romdj/zerotoone.solutions/commit/534e8ece1d64aa8d84a74c5a2c78fd8163b1c70c))
* enhance homepage storytelling with cohesive narrative arc ([b552e49](https://github.com/romdj/zerotoone.solutions/commit/b552e49b5b05cdb30e5cbae197486c457dd8164f))
* redesign company sections with investor relations design language ([1954f43](https://github.com/romdj/zerotoone.solutions/commit/1954f43b27a4bbd8ea0a30f182145de51d89d090))
* streamline ABVV section by removing logo in favor of clean text ([58a54cb](https://github.com/romdj/zerotoone.solutions/commit/58a54cbe3d1b0d2de36633d9cf33a7950a403ccc))
* updated the beer story ([7244bab](https://github.com/romdj/zerotoone.solutions/commit/7244bab66cadb021a4221cf25842a900ea496cbf))
* updated the beer story ([ad9e97b](https://github.com/romdj/zerotoone.solutions/commit/ad9e97beae9b1b8667805df53129ef350694a6e2))


### 🐛 Bug Fixes

* replace company logos with clean SVG versions to eliminate white backgrounds ([4212afb](https://github.com/romdj/zerotoone.solutions/commit/4212afb9821ba6ef7c414ed09bb09e8668311d40))
* update Philips logo to use clean SVG version ([bd4e011](https://github.com/romdj/zerotoone.solutions/commit/bd4e011fa3ec8fad0ad51e27ea79b4eb8653e5f2))
