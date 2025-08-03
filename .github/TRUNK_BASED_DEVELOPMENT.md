# Trunk-Based Development Guidelines

This repository follows **trunk-based development** practices for fast, continuous integration and deployment.

## 🌳 Branching Strategy

### Main Branch (`main`)
- **Single source of truth** - All development flows through `main`
- **Always deployable** - Must pass all tests and quality gates
- **Short-lived feature branches** - Maximum 2-3 days before merging
- **No long-lived feature branches** - Avoid development silos

## 🚀 Development Workflow

### 1. Feature Development
```bash
# Create short-lived feature branch from main
git checkout main
git pull origin main
git checkout -b feature/short-descriptive-name

# Make small, frequent commits
git add .
git commit -m "feat: add specific feature component"

# Push and create PR quickly (within 1-3 days)
git push origin feature/short-descriptive-name
```

### 2. Commit Standards
- **Use conventional commits** for automated changelog generation
- **Small, atomic commits** that can be easily reviewed
- **Descriptive commit messages** explaining the "why", not just the "what"

### 3. Integration Rules
- **Feature flags** for incomplete features reaching main
- **Automated testing** runs on every push to main
- **Fast feedback loops** - CI must complete in <10 minutes
- **Immediate fixes** for broken main branch

## 🔄 CI/CD Pipeline

### Continuous Integration (on every push to main)
- ✅ Automated testing (unit, integration, e2e)
- ✅ Code quality checks (linting, type checking)
- ✅ Build verification
- ✅ Mobile navigation testing

### Continuous Deployment (on main branch)
- 🚀 Automatic deployment to production
- 📦 Version bumping and changelog generation
- ☁️ AWS S3 sync and CloudFront invalidation
- 🔍 Infrastructure provisioning with Terraform

## 📋 Pull Request Guidelines

### Small, Focused PRs
- **Single concern** - One feature or fix per PR
- **Quick review cycles** - Target <24 hour review time
- **Self-contained** - Includes tests and documentation updates
- **Ready to merge** - No "draft" PRs sitting for days

### PR Requirements
- ✅ All CI checks passing
- ✅ Code review approval
- ✅ Conventional commit format
- ✅ No merge conflicts with main
- ✅ Mobile tests passing

## 🛡️ Quality Gates

### Automated Quality Checks
- **Test Coverage** - Maintain >80% coverage
- **Performance Tests** - Mobile navigation suite
- **Type Safety** - TypeScript strict mode
- **Accessibility** - Basic a11y checks

### Manual Review Focus
- **Architecture decisions** - Does this align with system design?
- **User experience** - How does this affect the end user?
- **Security considerations** - Any potential vulnerabilities?
- **Performance impact** - Will this slow down the application?

## 🔧 Tooling Support

### Automated Versioning
```bash
# Generate changelog from commits
npm run changelog

# Create release with version bump
npm run release
npm run release:patch
npm run release:minor
npm run release:major
```

### Testing Commands
```bash
# Run full test suite
npm test

# Quick feedback loop
npm run test:quick

# Mobile-specific testing
npm run test:mobile
```

## 🚨 Emergency Procedures

### Broken Main Branch
1. **Stop all feature development** immediately
2. **Create hotfix branch** from main
3. **Fix the issue** with minimal changes
4. **Fast-track review** and merge
5. **Deploy immediately** after merge

### Rollback Strategy
1. **Identify last good commit** on main
2. **Create revert PR** if needed
3. **Deploy previous version** using AWS infrastructure
4. **Investigate root cause** and prevent recurrence

## 📈 Success Metrics

### Development Velocity
- **Lead time** from code commit to production: <2 hours
- **Deployment frequency**: Multiple times per day
- **PR merge time**: <24 hours average
- **Failed deployment rate**: <5%

### Quality Metrics
- **Mean time to recovery**: <30 minutes
- **Test suite execution time**: <10 minutes
- **Code review coverage**: 100% of changes
- **Automated test coverage**: >80%

## 🎯 Key Principles

1. **"Main is Always Deployable"** - Never break the main branch
2. **"Small Batches"** - Frequent, small changes over large features
3. **"Fast Feedback"** - Quick CI/CD cycles and immediate issue detection
4. **"Shared Ownership"** - Everyone is responsible for main branch health
5. **"Continuous Learning"** - Retrospectives and process improvements

---

For questions about trunk-based development practices, refer to [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/) or discuss with the team.