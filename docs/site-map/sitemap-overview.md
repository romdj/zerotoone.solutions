# Sitemap Overview - Zero to One Solutions

**Identity:** Option 4 - Integrated Portfolio ("Builder" Identity)

**Last Updated:** 2025-12-26

---

## Complete Hierarchy

```
zerotoone.solutions/
│
├─ / (Homepage)
│   └─ "We Build Solutions—From Code to Companies"
│
├─ /portfolio
│   ├─ Filterable views:
│   │   ├─ All Projects (default)
│   │   ├─ Consulting Projects (Nike, IBM, Philips, ABVV)
│   │   ├─ Venture Companies (aerowheelcase, tempsdarret.studio, sports R&D)
│   │   └─ Experiments & Side Projects (NHL simulation, meetup, GitHub)
│   │
│   └─ Individual project anchors:
│       ├─ #nike
│       ├─ #ibm
│       ├─ #philips
│       ├─ #abvv
│       ├─ #aerowheelcase
│       ├─ #tempsdarret
│       ├─ #sports-equipment
│       ├─ #nhl-simulation
│       └─ #meetup
│
├─ /services
│   ├─ Enterprise Consulting
│   ├─ Startup Advisory
│   ├─ Venture Building (Co-Building)
│   └─ Incubator Program
│
├─ /studio
│   ├─ The Journey (consulting → ventures)
│   ├─ Professional Background
│   │   ├─ Nike (Lead Solution Architect)
│   │   ├─ IBM (Solution Architect)
│   │   ├─ Philips (Platform Architect)
│   │   └─ ABVV-FGTB (Solution Architect)
│   ├─ Philosophy: Multidisciplinary Approach
│   │   ├─ Photography
│   │   ├─ Engineering Research
│   │   ├─ Athletics
│   │   └─ Design Thinking
│   ├─ Side Projects & Experiments
│   ├─ #incubator (Incubator Program Section)
│   └─ The Vision (long-term)
│
├─ /insights
│   ├─ Featured Article (when content exists)
│   ├─ Article Categories:
│   │   ├─ Building Ventures
│   │   ├─ Enterprise Transformations
│   │   ├─ Frameworks & Tools
│   │   └─ From the Lab
│   └─ Newsletter Signup
│
└─ /contact
    ├─ Form with inquiry type routing:
    │   ├─ Enterprise Transformation
    │   ├─ Startup Technology Strategy
    │   ├─ Venture Building / Co-Building
    │   ├─ Incubator Application
    │   ├─ Partnership Opportunity
    │   └─ General Inquiry
    └─ Alternative contact methods
```

---

## Navigation Structure

### Desktop Navigation
```
┌─────────────────────────────────────────────────────────────┐
│ [Zero to One Logo]    Portfolio | Services | Studio |       │
│                                   Insights | [Let's Build]   │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Navigation
```
┌──────────────────────────┐
│  [Logo]              [☰] │
└──────────────────────────┘

When hamburger clicked:
┌──────────────────────────┐
│  Portfolio               │
│  Services                │
│  Studio                  │
│  Insights                │
│  ─────────────           │
│  [Let's Build] (CTA)     │
└──────────────────────────┘
```

---

## Page Routes & File Locations

| Route | File Location | Status |
|-------|--------------|--------|
| `/` | `src/routes/+page.svelte` | Rebuild (remove wireframe, create "We Build") |
| `/portfolio` | `src/routes/portfolio/+page.svelte` | Rebuild (add filtering, all projects) |
| `/services` | `src/routes/services/+page.svelte` | Rebuild (all 4 offerings) |
| `/studio` | `src/routes/studio/+page.svelte` | **New** (About + Incubator + Vision) |
| `/insights` | `src/routes/insights/+page.svelte` | Rename from `/resources`, populate |
| `/contact` | `src/routes/contact/+page.svelte` | Rebuild (unified form with routing) |

### Routes to Archive

| Old Route | Action | Reason |
|-----------|--------|--------|
| `/solutions` | Archive to `_archive/` | Content merged into `/services` |
| `/about` | Archive to `_archive/` | Content merged into `/studio` |
| `/incubator` | Archive to `_archive/` | Content merged into `/studio` |
| `/storyline` | Archive to `_archive/` | Content moved to `/insights` articles |
| `/services` (old) | Delete (empty) | Was never implemented |

---

## URL Parameters & Anchors

### Portfolio Filtering
```
/portfolio                    → All projects (default)
/portfolio?filter=consulting  → Consulting projects only
/portfolio?filter=ventures    → Venture companies only
/portfolio?filter=experiments → Side projects only
```

### Direct Project Links
```
/portfolio#nike              → Jump to Nike project
/portfolio#aerowheelcase     → Jump to Aerowheelcase venture
/portfolio?filter=consulting#nike → Filter + jump combination
```

### Studio Sections
```
/studio                      → Full studio page
/studio#incubator           → Jump directly to incubator section
```

### Contact Pre-Fill
```
/contact                     → Blank form
/contact?type=incubator     → Pre-selects "Incubator Application"
/contact?type=enterprise    → Pre-selects "Enterprise Transformation"
```

---

## Visitor Routing Logic

### Entry Point Detection

**Homepage as Entry:**
```
Visitor lands on /
  ↓
See "We Build Solutions—From Code to Companies"
  ↓
Visual split shows 4 categories:
  - Enterprise Platforms (consulting)
  - Venture Companies
  - Open Source & Tools
  - Physical Products
  ↓
Self-select based on interest
```

**Portfolio as Entry (most common):**
```
Visitor lands on /portfolio (from LinkedIn, Google, etc.)
  ↓
See filter bar: [All] [Consulting] [Ventures] [Experiments]
  ↓
Filter to relevant category
  ↓
View projects
  ↓
Click through to /services or /contact
```

**Direct Link to Specific Project:**
```
Visitor clicks /portfolio#nike (from LinkedIn post, etc.)
  ↓
Page loads and scrolls to Nike project
  ↓
Can explore other projects or navigate to /services
```

---

## Cross-Page Linking Strategy

### Homepage Links TO:
- `/portfolio` - "See What We Build" (primary CTA)
- `/services` - "Work With Us" (secondary CTA)
- `/portfolio?filter=consulting` - "View Projects" (from Enterprise Platforms card)
- `/portfolio?filter=ventures` - "View Ventures" (from Venture Companies card)
- `/portfolio?filter=experiments` - "View Experiments" (from Open Source card)
- `/portfolio?filter=physical` - "View R&D" (from Physical Products card)
- `/portfolio#nike` - "View Project" (from Nike featured project)
- `/portfolio#aerowheelcase` - "View Venture" (from Aerowheelcase featured)
- `/studio` - "Learn More About Our Approach" (philosophy preview)
- `/contact` - "Start a Conversation" (final CTA)

### Portfolio Links TO:
- `/services` - "See How We Work" (after viewing projects)
- `/contact` - "Start a Conversation" (CTA after project cards)
- `/studio` - "Learn More About Us" (optional discovery)
- External: aerowheelcase.com, tempsdarret.studio (venture websites)
- External: GitHub repos (side projects)

### Services Links TO:
- `/portfolio?filter=consulting` - "View Enterprise Projects"
- `/portfolio?filter=ventures` - "View Our Ventures"
- `/studio#incubator` - "Learn About Incubator" (from Startup Advisory)
- `/studio#incubator` - "Apply to Incubator" (from Incubator section)
- `/contact` - "Start a Conversation" (multiple CTAs)

### Studio Links TO:
- `/portfolio` - "View What We're Building"
- `/portfolio?filter=ventures` - "See Our Ventures"
- `/contact?type=incubator` - "Apply to Incubator"
- `/contact` - "Let's Talk" (general CTA)
- External: tempsdarret.studio, GitHub, Meetup links

### Insights Links TO:
- `/portfolio` - "View Our Work" (reference projects in articles)
- `/services` - "Work With Us" (from relevant articles)
- `/studio` - "Learn More About Our Approach"
- `/contact` - "Get in Touch"

### Contact Links TO:
- `/portfolio` - "View Our Work" (if they want to see more first)
- `/services` - "See How We Work" (if they want clarity on offerings)

---

## Breadcrumb Structure (Optional, Future Enhancement)

```
Home > Portfolio > Nike Project
Home > Services > Enterprise Consulting
Home > Studio > Incubator
Home > Insights > Article Title
```

Currently not implemented, but structure allows for easy addition.

---

## Sitemap.xml Structure (for SEO)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://zerotoone.solutions/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://zerotoone.solutions/portfolio</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://zerotoone.solutions/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://zerotoone.solutions/studio</loc>
    <changefreq>quarterly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://zerotoone.solutions/insights</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://zerotoone.solutions/contact</loc>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Individual articles (when published) -->
  <url>
    <loc>https://zerotoone.solutions/insights/focus-on-your-beer</loc>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>

</urlset>
```

---

## Analytics Event Tracking

### Homepage Events
```javascript
// Track CTA clicks
trackEvent('homepage_cta', { type: 'portfolio' })
trackEvent('homepage_cta', { type: 'services' })

// Track category card clicks
trackEvent('category_click', { category: 'consulting' })
trackEvent('category_click', { category: 'ventures' })
trackEvent('category_click', { category: 'experiments' })
trackEvent('category_click', { category: 'physical' })

// Track featured project clicks
trackEvent('featured_project', { project: 'nike' })
trackEvent('featured_project', { project: 'aerowheelcase' })
```

### Portfolio Events
```javascript
// Track filter usage
trackEvent('portfolio_filter', { filter: 'consulting' })
trackEvent('portfolio_filter', { filter: 'ventures' })
trackEvent('portfolio_filter', { filter: 'experiments' })

// Track project views
trackEvent('project_view', { project: 'nike', category: 'consulting' })
trackEvent('project_view', { project: 'aerowheelcase', category: 'ventures' })

// Track external links
trackEvent('external_link', { destination: 'aerowheelcase.com' })
trackEvent('external_link', { destination: 'tempsdarret.studio' })
```

### Services Events
```javascript
// Track service interest
trackEvent('service_view', { service: 'enterprise' })
trackEvent('service_view', { service: 'startup' })
trackEvent('service_view', { service: 'venture-building' })
trackEvent('service_view', { service: 'incubator' })
```

### Contact Events
```javascript
// Track form interactions
trackEvent('form_start', { inquiry_type: inquiry })
trackEvent('form_submit', { inquiry_type: inquiry })
trackEvent('form_error', { field: fieldName })

// Track alternative contact methods
trackEvent('contact_method', { type: 'email' })
trackEvent('contact_method', { type: 'linkedin' })
trackEvent('contact_method', { type: 'github' })
```

---

## Mobile Considerations

### Navigation Behavior
- Hamburger menu icon (top right)
- Full-screen menu overlay when opened
- Close on navigation OR outside tap
- Smooth transitions (300ms)

### Touch Targets
- Minimum 44x44px for all clickable elements
- Filter buttons: Full width on mobile, stacked
- Project cards: Single column on < 600px

### Performance
- Lazy load images below fold
- Defer non-critical CSS
- Minimize JavaScript bundle
- Target: < 3s load time on 3G

---

## Accessibility

### Navigation
- ARIA labels on all nav links
- Keyboard navigation support (Tab, Enter)
- Focus indicators visible
- Skip to main content link

### Content
- Semantic HTML (proper heading hierarchy)
- Alt text on all images
- Color contrast ratios > 4.5:1
- Form labels properly associated

### Interactions
- Filter buttons: aria-pressed state
- Form validation: aria-invalid, aria-describedby
- Loading states: aria-busy
- Success/error messages: role="alert"

---

## Internationalization (Future)

Currently English-only. If expanding:

```
/en/portfolio
/nl/portfolio  (Dutch for local Eindhoven audience)
/fr/portfolio  (French for Belgian clients)
```

Not implemented in Phase 1, but structure allows for it.

---

## Notes

- All internal links use relative paths (`/portfolio`, not `https://zerotoone.solutions/portfolio`)
- External links open in new tab (`target="_blank" rel="noopener"`)
- Form submissions should include UTM tracking for source attribution
- Portfolio filter state persists in URL (shareable links)

---

**Next:** See individual page documentation for detailed content and ethos.
