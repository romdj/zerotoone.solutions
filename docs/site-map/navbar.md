# Navigation Structure - High Level

**Zero to One Solutions - Option 4: Integrated Portfolio ("Builder" Identity)**

**Last Updated:** 2025-12-27

---

## Primary Navigation

```
┌──────────────────────────────────────────────────────────────────────┐
│  [01 Logo]    Portfolio | Services | Studio | Insights | [Let's Build] │
└──────────────────────────────────────────────────────────────────────┘
```

### Navigation Items (Left to Right)

| Position | Label | Route | Type | Purpose |
|----------|-------|-------|------|---------|
| 1 (Logo) | "01" | `/` | Brand | Return to homepage |
| 2 | Portfolio | `/portfolio` | Nav Link | Proof - what we've built |
| 3 | Services | `/services` | Nav Link | How we work together |
| 4 | Studio | `/studio` | Nav Link | Who we are, our journey |
| 5 | Insights | `/insights` | Nav Link | Thought leadership content |
| 6 | Let's Build | `/contact` | CTA Button | Primary conversion action |

---

## Navigation Philosophy

### Order Rationale

**1. Portfolio First**
- Lead with proof, not promises
- Shows range immediately (enterprise + ventures + experiments)
- Builds credibility before asking for anything
- Allows visitor self-selection via filtering

**2. Services Second**
- After seeing proof, understand how to work together
- Clear service offerings for different needs
- Answers "how can I work with you?"

**3. Studio Third**
- Deeper context about the journey and philosophy
- Personal story and multidisciplinary approach
- Incubator program details

**4. Insights Fourth**
- Thought leadership for engaged visitors
- Content hub for organic discovery
- Demonstrates strategic thinking

**5. Let's Build (CTA)**
- Clear, action-oriented CTA
- Always accessible from any page
- Visual distinction (button vs text link)

---

## Site Structure Overview

```
/
├─ Home (/)
│  ├─ Hero: "We Build Solutions—From Code to Companies"
│  ├─ What We Build (4 categories)
│  ├─ Trusted By (Nike, IBM, Philips...)
│  ├─ Featured Projects
│  ├─ Philosophy Preview
│  └─ Final CTA
│
├─ Portfolio (/portfolio)
│  ├─ Filter: [All] [Consulting] [Ventures] [Experiments]
│  ├─ Consulting Projects (Nike, IBM, Philips, ABVV)
│  ├─ Venture Companies (aerowheelcase, tempsdarret.studio, sports R&D)
│  └─ Experiments (3-point NHL, meetup, open source)
│
├─ Services (/services)
│  ├─ Enterprise Consulting
│  ├─ Startup Advisory
│  ├─ Venture Building
│  ├─ Incubator Program
│  ├─ The Approach
│  └─ How We Work
│
├─ Studio (/studio)
│  ├─ The Journey (consulting → ventures transition)
│  ├─ Professional Background (Nike, IBM, Philips, ABVV)
│  ├─ Multidisciplinary Approach
│  ├─ Side Projects & Experiments
│  ├─ Incubator Program (#incubator anchor)
│  └─ The Vision (long-term)
│
├─ Insights (/insights)
│  ├─ Featured Article
│  ├─ Building Ventures (category)
│  ├─ Enterprise Transformations (category)
│  ├─ Frameworks & Tools (category)
│  ├─ From the Lab (category)
│  └─ Newsletter Signup
│
└─ Contact (/contact)
   ├─ Hero
   ├─ Contact Form (with inquiry type routing)
   ├─ Alternative Contact Methods
   └─ What Happens Next
```

---

## URL Structure & Routing

### Primary Routes

| Route | Page | Key Features |
|-------|------|--------------|
| `/` | Homepage | Hero, featured projects, philosophy |
| `/portfolio` | Portfolio | Project showcase with filtering |
| `/services` | Services | 4 service offerings |
| `/studio` | Studio | About, journey, incubator |
| `/insights` | Insights | Thought leadership hub |
| `/contact` | Contact | Form with inquiry routing |

### URL Parameters

**Portfolio Filtering:**
```
/portfolio                    → All projects
/portfolio?filter=consulting  → Consulting projects only
/portfolio?filter=ventures    → Venture companies only
/portfolio?filter=experiments → Experiments & side projects only
```

**Contact Pre-Fill:**
```
/contact?type=enterprise   → Pre-selects "Enterprise Transformation"
/contact?type=startup      → Pre-selects "Startup Technology Strategy"
/contact?type=venture      → Pre-selects "Venture Building / Co-Building"
/contact?type=incubator    → Pre-selects "Incubator Application"
/contact?type=partnership  → Pre-selects "Partnership Opportunity"
```

### Anchor Links

**Studio Page:**
```
/studio#incubator         → Jump to Incubator Program section
```

**Portfolio Page:**
```
/portfolio#nike           → Jump to Nike project
/portfolio#aerowheelcase  → Jump to Aerowheelcase venture
```

---

## Navigation Behavior

### Desktop (> 768px)

```
┌────────────────────────────────────────────────────────────┐
│  [01]  Portfolio  Services  Studio  Insights  [Let's Build] │
└────────────────────────────────────────────────────────────┘
```

- Horizontal navigation bar
- Logo left, navigation center/left, CTA right
- Fixed position on scroll (with subtle shadow)
- Active page indicator (gradient underline)

### Mobile (< 768px)

```
┌──────────────────────────────┐
│  [01]              [☰]       │
└──────────────────────────────┘
        ↓ (when opened)
┌──────────────────────────────┐
│  Portfolio                   │
│  Services                    │
│  Studio                      │
│  Insights                    │
│  ──────────────────          │
│  [Let's Build]               │
└──────────────────────────────┘
```

- Hamburger menu icon right side
- Full-screen overlay menu
- Vertical stack of links
- CTA button at bottom (prominent)
- Close icon (×) in top right

---

## Visual Design

### Active State
- Gradient underline on current page
- Color: `linear-gradient(135deg, #F11759, #8333C5)`
- Height: 2px
- Animation: Slide in from left (0.3s ease)

### Hover State
- Text color shift to gradient
- Subtle scale (1.02)
- Transition: 0.2s ease

### CTA Button Style
- **Default:** White text on gradient background
- **Hover:** Slight scale (1.05), deeper shadow
- **Border Radius:** 999px (pill shape)
- **Padding:** 12px 24px

---

## Sticky Navigation

### Scroll Behavior
- **Top of page:** Full navigation with padding
- **After 100px scroll:** Sticky header with compact padding
- **Transition:** Smooth 0.3s ease
- **Shadow:** Subtle shadow appears on scroll

### Mobile Considerations
- Navigation collapses to hamburger < 768px
- Logo remains visible
- CTA accessible via menu (not hidden)

---

## Cross-Page Linking Strategy

### Homepage → Other Pages
- "See What We Build" → `/portfolio`
- "Work With Us" → `/services`
- Featured project cards → `/portfolio#[project-id]`
- "Learn More About Our Approach" → `/studio`

### Portfolio → Other Pages
- "View Enterprise Projects" → `/portfolio?filter=consulting`
- "Explore Our Ventures" → `/portfolio?filter=ventures`
- "Start a Conversation" → `/contact`
- "See How We Work" → `/services`

### Services → Other Pages
- "View Enterprise Projects" → `/portfolio?filter=consulting`
- "Learn About Incubator" → `/studio#incubator`
- "View Our Ventures" → `/portfolio?filter=ventures`
- "Apply to Incubator" → `/contact?type=incubator`

### Studio → Other Pages
- "See What We're Building" → `/portfolio`
- "Let's Talk" → `/contact`
- "Apply to Incubator" → `/contact?type=incubator`

### Insights → Other Pages
- Article links → `/portfolio` (related projects)
- Article links → `/services` (relevant offering)
- Newsletter CTA → In-page signup form

### Contact → Other Pages
- Success state: "Back to Home" → `/`
- Success state: "View Portfolio" → `/portfolio`

---

## Breadcrumbs (Optional - Future)

For deeper content pages (e.g., individual blog posts):

```
Home > Insights > Building Ventures > Article Title
```

Not needed for initial 6-page structure.

---

## Footer Navigation (Secondary)

```
┌─────────────────────────────────────────────────────────────┐
│  Quick Links          Connect            Legal               │
│  • Portfolio          • LinkedIn         • Privacy Policy    │
│  • Services           • GitHub           • Terms of Service  │
│  • Studio             • Email            │
│  • Insights           │                  │
│  • Contact            │                  │
│                                                               │
│  © 2025 Zero to One Solutions. Creating Tomorrow, Today.    │
└─────────────────────────────────────────────────────────────┘
```

### Footer Sections
1. **Quick Links** - All primary navigation pages
2. **Connect** - Social media & contact links
3. **Legal** - Privacy policy, terms of service

---

## Accessibility

### Keyboard Navigation
- Tab order: Logo → Portfolio → Services → Studio → Insights → CTA
- Enter/Space to activate links
- Escape to close mobile menu
- Focus indicators visible (gradient outline)

### Screen Readers
- ARIA labels on navigation landmarks
- Skip to main content link (hidden visually)
- Active page announced ("current page")

### Mobile Touch Targets
- Minimum 44px × 44px touch targets
- Adequate spacing between links (12px minimum)
- Large hamburger menu icon (48px)

---

## Related Documentation

- [sitemap-overview.md](./sitemap-overview.md) - Complete technical hierarchy
- [homepage.md](./homepage.md) - Homepage content structure
- [portfolio.md](./portfolio.md) - Portfolio filtering system
- [services.md](./services.md) - Services page structure
- [studio.md](./studio.md) - Studio page content
- [insights.md](./insights.md) - Insights content strategy
- [contact.md](./contact.md) - Contact form routing

---

**Last Updated:** 2025-12-27
