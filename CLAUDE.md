# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **zerotoone.solutions** repository - a professional Svelte website for Romain Lussier's freelance solution architect consultancy "Zero to One Solutions" with the tagline "Creating Tomorrow, Today". The site showcases enterprise-level expertise with major corporation partnerships and a multidisciplinary approach to problem-solving.

## Current Website Structure (Implemented)

### Navigation Structure
- **Home** (`/`) - Hero with trusted partners section
- **Solutions** (`/solutions`) - Enterprise solutions by business challenge
- **Portfolio** (`/portfolio`) - Company-led case studies and innovation projects  
- **About** (`/about`) - Professional journey and beyond architecture interests
- **Resources** (`/resources`) - Thought leadership content (placeholder)
- **Startup Incubator** (`/incubator`) - Technology strategy for startups

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
│   ├── +layout.svelte          # Global layout with favicon and fonts
│   ├── +page.svelte             # Homepage with partners section
│   ├── solutions/+page.svelte   # Enterprise solutions (renamed from services)
│   ├── portfolio/+page.svelte   # Company-led case studies
│   ├── about/+page.svelte       # Comprehensive about with interests
│   ├── resources/+page.svelte   # Thought leadership (placeholder)
│   └── incubator/+page.svelte   # Startup consulting services
├── lib/styles/
│   ├── components.css           # Modular component styles
│   └── animations.css           # Animation utilities
└── app.css                      # Main CSS entry point
```

### CSS Architecture
- **Hybrid Approach**: Tailwind utilities + custom CSS components
- **@layer components**: Modular component organization
- **Brand Variables**: Consistent color system throughout
- **Animation System**: Float, fade-in, and gradient-shift effects
- **Responsive Design**: Mobile-first approach

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

### Current Status
- ✅ All core pages implemented
- ✅ Brand integration complete
- ✅ Responsive design functional
- ✅ Social links integrated
- ⏳ Resources page content (placeholder)
- ⏳ Animation implementations (placeholder)

## Development Commands

```bash
npm run dev          # Development server (port 5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Code linting (if configured)
npm run typecheck    # TypeScript checking (if configured)
```

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