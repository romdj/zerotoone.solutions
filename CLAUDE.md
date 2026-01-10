# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **zerotoone.solutions** repository - a professional Svelte website for Romain Lussier's freelance solution architect consultancy "Zero to One Solutions" with the tagline "Creating Tomorrow, Today". The site showcases enterprise-level expertise with major corporation partnerships and a multidisciplinary approach to problem-solving.

## Current Website Structure (Implemented)

### Navigation Structure
- **Home** (`/`) - Hero with trusted partners section
- **Work** (`/work`) - Enterprise case studies and transformations
- **In-House** (`/in-house/products`) - Startup and product development services
- **About** (`/about`) - Professional journey and beyond architecture interests
- **Contact** (`/contact`) - Multiple contact paths and consultation booking

### Key Features Implemented
- **Trusted Partners Section**: Prominent display of Nike, IBM, Philips, Levi's, Engie, Elia
- **"Empowering Those Who Shape the Future"** messaging
- **Company-led Portfolio**: Enterprise transformations featuring recognizable brands
- **Beyond Architecture**: Photography, engineering research, culinary arts, athletics
- **Social Integration**: LinkedIn and GitHub icons with hover effects
- **Brand Integration**: Full gradient color scheme and professional styling

## Brand Identity

### Colors & Design
- **Primary Gradient**: #F11759 → #8333C5 → #D67D21 (pink-purple-orange)
- **Typography**: Inter font family
- **Logo**: "01" stylized design on gradient background
- **Favicon**: SVG and PNG versions matching logo 3 assets

### Brand Messaging
- **Tagline**: "Creating Tomorrow, Today"
- **Value Proposition**: "Multidisciplinary approach combining technical expertise with creative problem-solving"
- **Partner Messaging**: "Empowering Those Who Shape the Future"

## Technical Implementation

### Framework & Architecture
- **SvelteKit** with TypeScript
- **Tailwind CSS v4** with hybrid CSS approach (due to compatibility issues)
- **PostCSS** configuration for Tailwind processing
- **Component-based** CSS organization in `/src/lib/styles/`

### File Structure
```
src/
├── routes/
│   ├── +layout.svelte                    # Global layout with navigation, favicon, fonts
│   ├── +page.svelte                       # Homepage with partners section
│   ├── work/+page.svelte                  # Enterprise case studies
│   ├── in-house/products/+page.svelte     # Startup packages and services
│   ├── about/+page.svelte                 # Professional journey and interests
│   ├── contact/+page.svelte               # Contact paths and consultation booking
│   └── storyline/+page.svelte             # Alternative homepage narrative (experimental)
├── lib/
│   ├── components/
│   │   └── Navigation.svelte              # Main navigation component
│   ├── styles/
│   │   ├── homepage.css                   # Global styles and dark mode
│   │   ├── navigation.css                 # Navigation-specific styles
│   │   └── theme.css                      # Theme system utilities
│   └── stores/
│       └── theme.ts                       # Dark/light theme store
└── app.css                                # Tailwind base + utility classes
```

### CSS Architecture
- **Hybrid Approach**: Tailwind utilities + custom CSS components
- **CSS Variables**: Centralized color system with dark mode support
- **Dark Mode**: Theme toggle with comprehensive dark theme coverage across all pages
- **Global vs Scoped**: Global CSS files (homepage.css, navigation.css) use direct selectors, component `<style>` blocks use `:global()` wrapper
- **Animation System**: Float, fade-in, and gradient-shift effects
- **Responsive Design**: Mobile-first approach with breakpoints at 768px (mobile) and 1024px (tablet)

## Content Strategy

### Professional Positioning
- **Enterprise Credibility**: Nike, IBM, Philips partnerships prominent
- **Solution-focused**: Organized by business challenge, not technical service
- **Case Study Driven**: Real company names and specific achievements
- **Multidisciplinary**: Technical + creative + community involvement

### Personal Branding Elements
- **Photography Studio**: tempsdarret.studio creative work
- **Engineering Research**: 3D CAD, composites, aerodynamics
- **Community Leadership**: BECI member, meetup founder, gaming community
- **Athletic Discipline**: Triathlon, skiing, cycling
- **Culinary Expertise**: Coffee roasting, high-end cooking

## Development Context

### Key Decisions Made
1. **Renamed Services → Solutions**: Better enterprise positioning
2. **Company-first Portfolio**: Nike, IBM, Philips lead case studies
3. **Hybrid CSS**: Tailwind utilities + custom components for v4 compatibility
4. **Social Integration**: GitHub and LinkedIn prominently featured
5. **Comprehensive About**: Beyond technical skills showcase

### Technical Challenges Resolved
- **Tailwind v4 Compatibility**: Moved to hybrid CSS approach
- **CSS Loading Issues**: Moved critical styles outside @layer
- **Brand Integration**: Consistent gradient system implementation
- **Favicon Creation**: SVG matching logo 3 design
- **Dark Mode Implementation**: Fixed CSS specificity issues by removing `:global()` wrappers from global CSS files and adding `!important` flags for proper dark theme rendering

### Current Status
- ✅ All core pages implemented
- ✅ Brand integration complete
- ✅ Responsive design functional
- ✅ Social links integrated
- ✅ Dark mode fully implemented
- ⏳ Resources page content (placeholder)
- ⏳ Animation implementations (placeholder)

## Development Commands

```bash
npm run dev          # Development server (port 12000)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Code linting (if configured)
npm run typecheck    # TypeScript checking (if configured)
npm run changelog    # Generate changelog from commits
npm run release      # Create new release with version bump
```

**Note**: A development server instance is expected to always be running on port 12000 during active development.

## Commit Message Standards

**CRITICAL**: This repository REQUIRES conventional commit messages at all times.

### Commit Message Format

All commits MUST follow the conventional commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Allowed Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc)
- `refactor`: Code refactoring (neither fixes a bug nor adds a feature)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or dependency changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes (maintenance tasks, etc)
- `revert`: Revert a previous commit

### Examples

```bash
feat: add dark mode toggle to navigation
fix: resolve text visibility issue in dark mode
docs: update homepage design documentation
refactor: consolidate navigation CSS into shared file
chore: update changelog
```

### Enforcement
- **Husky** runs `commitlint` on every commit via `commit-msg` hook
- Commits that don't follow the convention will be **rejected**
- The CI/CD pipeline automatically generates `CHANGELOG.md` from conventional commits
- Use `npm run changelog` to preview changelog locally

## Future Enhancements

### Priority Items
1. **Custom Animations**: Solutions page architecture transformations
2. **Resources Content**: Blog posts and thought leadership
3. **Company Logos**: Replace text with actual logo images
4. **Contact Forms**: Professional inquiry system
5. **Analytics Integration**: User behavior tracking

### Content Development
- Architecture insight articles
- Technology framework recommendations  
- Migration checklists and templates
- Newsletter signup functionality

## Development Memories

### Server Configuration
- Always check if something is running on port 12000 before running the server

### Resource Configuration
- Checked the official Pulumi GitHub Action setup page: The latest version of `pulumi/setup@v2` is the correct reference, but it's recommended to always verify the current version in the official documentation to ensure compatibility and access to the latest features