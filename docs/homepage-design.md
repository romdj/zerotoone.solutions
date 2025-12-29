# Homepage Design

**Last Updated:** 2025-12-29

---

## Design Philosophy

Inspired by **Metalab** (logo grid, trust signals) + **Instrument** (storytelling, depth)

**Core Message:** "You bring the idea, we make it a reality"

---

## Page Sections

### 1. Hero Section

**Purpose:** Immediate impact, clear value proposition

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              Creating Tomorrow, Today                   │
│                                                         │
│         You bring the idea, we make it a reality        │
│                                                         │
│    Technological know-how • Design thinking • Value     │
│                                                         │
│                   [View Our Work]                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Content:**
- **Headline**: "Creating Tomorrow, Today" (tagline)
- **Sub-headline**: "You bring the idea, we make it a reality"
- **Value props**: "Zero to One Solutions combines technological know-how, expertise, and full-fledged design thinking to deliver value"
- **CTA Button**: "View Our Work" → `/work`

**Styling:**
- Background: Clean white or subtle gradient
- Typography:
  - Headline: 56px, 800 weight, gradient text (#F11759 → #8333C5)
  - Sub-headline: 32px, 600 weight, dark gray
  - Value props: 18px, 500 weight, medium gray
- CTA: Gradient background, white text, rounded, shadow on hover
- Spacing: Generous padding (120px top/bottom)

---

### 2. Trusted Partners Section

**Purpose:** Immediate credibility through brand recognition

**Layout (Metalab-inspired):**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│       Empowering Those Who Shape the Future             │
│                                                         │
│    [Nike]   [IBM]   [Philips]   [Levi's]   [Engie]    │
│                                                         │
│                       [Elia]                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Content:**
- **Heading**: "Empowering Those Who Shape the Future"
- **Logo Grid**: 6 company logos
  - Nike
  - IBM
  - Philips
  - Levi's
  - Engie
  - Elia

**Styling:**
- Background: Light gray (#f8f8f8)
- Heading: 24px, 600 weight, centered
- Logo Grid:
  - Grayscale logos by default
  - Color on hover
  - Even spacing, responsive grid (3 cols desktop, 2 cols tablet, 1 col mobile)
  - Each logo in a card with subtle border
- Padding: 80px top/bottom

**Logo Requirements:**
- Need to source/create company logos
- Format: SVG or high-res PNG
- Dimensions: ~200px width max
- Fallback: Text-based if logos unavailable

---

### 3. What We Do (Positioning Statement)

**Purpose:** Explain the "Zero to One" value proposition

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              From Vision to Reality                     │
│                                                         │
│  We transform ambitious ideas into production-ready     │
│  solutions. Whether it's modernizing legacy systems,    │
│  building cloud-native platforms, or leading technical  │
│  teams—we deliver full-stack expertise from             │
│  architecture to deployment.                            │
│                                                         │
│     [Solution        [Software         [Technology      │
│      Architecture]    Engineering]      Leadership]     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Content:**
- **Heading**: "From Vision to Reality"
- **Description**: Value proposition paragraph
- **Capability Pills**:
  - Solution Architecture
  - Software Engineering
  - AI & Machine Learning
  - Technology Leadership

**Styling:**
- Background: White
- Heading: 40px, 700 weight, centered
- Description: 20px, 400 weight, centered, max-width 800px
- Pills: Inline badges with gradient border, hover effect
- Padding: 100px top/bottom

---

### 4. Featured Work

**Purpose:** Showcase flagship projects with depth

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    Selected Work                        │
│                                                         │
│  ┌───────────────────┐  ┌───────────────────┐          │
│  │                   │  │                   │          │
│  │  NIKE             │  │  IBM              │          │
│  │  Supply Chain     │  │  IoT Solutions    │          │
│  │  Transformation   │  │  & Cloud          │          │
│  │                   │  │                   │          │
│  │  [View Case]      │  │  [View Case]      │          │
│  └───────────────────┘  └───────────────────┘          │
│                                                         │
│  ┌───────────────────┐                                 │
│  │                   │                                 │
│  │  PHILIPS          │                                 │
│  │  IoT Platform     │                                 │
│  │  Architecture     │                                 │
│  │                   │                                 │
│  │  [View Case]      │                                 │
│  └───────────────────┘                                 │
│                                                         │
│                  [View All Work →]                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Content:**
- **Heading**: "Selected Work"
- **3 Featured Cases**:
  1. **Nike** - Supply Chain Transformation
     - Led team of 12
     - Event-driven architecture
     - Link: `/work/nike`
  2. **IBM** - IoT Solutions & Cloud Architecture
     - Enterprise integration
     - Multi-cloud strategy
     - Link: `/work/ibm`
  3. **Philips** - IoT Platform Architecture
     - Healthcare compliance
     - AWS serverless
     - Link: `/work/philips`
- **CTA**: "View All Work" → `/work`

**Styling:**
- Background: White
- Heading: 40px, 700 weight, left-aligned
- Cards:
  - Border: 1px solid #e5e5e5
  - Padding: 32px
  - Hover: Shadow elevation, gradient border
  - Company logo (small, top-left)
  - Project title: 24px, 600 weight
  - Description: 16px, 400 weight
  - "View Case" link with arrow
- Grid: 2 columns on desktop, 1 on mobile
- Padding: 100px top/bottom

---

### 5. Final CTA Section

**Purpose:** Drive action - contact or explore work

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              Ready to Build Something?                  │
│                                                         │
│      Let's discuss how we can bring your vision         │
│                    to reality                           │
│                                                         │
│         [Get In Touch]      [View Our Work]             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Content:**
- **Heading**: "Ready to Build Something?"
- **Sub-text**: "Let's discuss how we can bring your vision to reality"
- **CTAs**:
  - Primary: "Get In Touch" → `/contact`
  - Secondary: "View Our Work" → `/work`

**Styling:**
- Background: Gradient (#F11759 → #8333C5 → #D67D21)
- Text: White
- Heading: 40px, 700 weight
- Buttons: White background on primary, outline on secondary
- Padding: 120px top/bottom

---

## Responsive Behavior

### Desktop (>= 1024px)
- Full-width sections with max-width: 1200px container
- Logo grid: 3 columns
- Featured work: 2 columns
- Generous spacing and typography

### Tablet (768px - 1023px)
- Logo grid: 2 columns
- Featured work: 2 columns
- Reduced font sizes
- Medium spacing

### Mobile (< 768px)
- Logo grid: 2 columns
- Featured work: 1 column (stacked)
- Hero headline: 36px
- Reduced spacing
- CTA buttons: Full width

---

## Animation & Interaction

### On Scroll Animations
- **Fade in from bottom**: Hero elements (stagger)
- **Fade in**: Section headings
- **Scale in**: Logo grid items (stagger)
- **Slide up**: Featured work cards (stagger)

### Hover States
- **Logo grid**: Grayscale → color
- **Featured cards**: Elevation + gradient border glow
- **CTAs**: Shadow increase + slight scale
- **Capability pills**: Background fill with gradient

### Performance
- Use `IntersectionObserver` for scroll animations
- Lazy load images below fold
- Optimize logo images (WebP with PNG fallback)

---

## Positioning Statement (Copy)

**Full Version (for "What We Do" section):**

> We transform ambitious ideas into production-ready solutions. Whether it's modernizing legacy systems, building cloud-native platforms, or leading technical teams—we deliver full-stack expertise from architecture to deployment.
>
> From zero to one, we bridge the gap between vision and reality.

**Short Version (for meta/SEO):**

> Zero to One Solutions: Transforming ambitious ideas into production-ready solutions. Full-stack expertise from architecture to deployment.

---

## Footer Note (Per user request)

Include elegant mention that site is built with Svelte:

> Crafted with [SvelteKit](https://kit.svelte.dev)

Place in footer alongside copyright and social links.

---

**Last Updated:** 2025-12-29
