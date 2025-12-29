# Site Structure & Navigation

**Last Updated:** 2025-12-29

---

## Navigation Structure

Inspired by Instrument.com and Metalab.com with Zero to One Solutions customizations.

### Primary Navigation

```
WORK | IN-HOUSE | ABOUT | CONTACT
```

**Decision:** Work-first approach. No separate SERVICES section - the work speaks for itself.

---

## Detailed Sitemap

### 1. HOME (`/`)

**Purpose:** First impression, trust signals, "Zero to One Solutions" story

**Content Sections:**
- Hero with positioning statement: "You bring the idea, we make it a reality" + "Creating Tomorrow, Today"
- Message: Zero to One Solutions combines technological know-how, expertise, and full-fledged design thinking to deliver value
- Logo grid: Nike, IBM, Philips, Levi's, Engie, Elia (trust signals)
- Featured case studies (3 deep ones)
- Call-to-action

**Inspiration:** Metalab (logo grid) + Instrument (storytelling)

---

### 2. WORK (`/work`)

**Purpose:** Portfolio showcase - all client projects organized by service type

**Layout:** Grid view with category tabs

**Category Tabs (Simple filtering):**
- All Work
- Solution Architecture (Elia, ABVV-FGTB, IBM)
- Software Engineering (Extra Horizon, Philips, Engie)
- AI/ML/Deep Learning (Nike)
- Technology Leadership (Nike team lead)

**How it works:** Click a tab → filter projects by primary category. One category per project for simplicity.

**Projects Listed:**

**Deep Case Studies (Instrument-style):**
1. Nike - Retail Digital Transformation
2. IBM - Cloud Migration & Modernization
3. Philips - IoT Platform Architecture

**Lightweight Case Studies (Metalab-style):**
4. Levi's - E-commerce Platform
5. Engie - Energy Optimization System
6. Elia - Grid Modernization

**Individual Project Pages:** `/work/[project-slug]`
- Deep projects: Multi-section storytelling with metrics
- Lightweight projects: Brief overview with key visuals

---

### 3. IN-HOUSE (`/in-house`)

**Purpose:** Internal products, companies, ventures built by Zero to One Solutions

**Subsections:**

#### 4.1 Products (`/in-house/products`)
- Product showcase
- Tech stack
- Problem solved
- Status (Live, In Development, Concept)

#### 4.2 Companies (`/in-house/companies`)
- Venture studio portfolio
- Company descriptions
- Investment/partnership details
- Current status

**Layout:** Card grid similar to Work section but distinct branding

---

### 4. ABOUT (`/about`)

**Purpose:** Romain's story, multidisciplinary background, "beyond architecture"

**Content Sections:**

#### 5.1 Professional Journey
- Enterprise partnerships (Nike, IBM, Philips, etc.)
- Solution architect expertise
- Technology leadership experience

#### 5.2 Beyond Architecture
- **Photography:** tempsdarret.studio
- **Engineering Research:** 3D CAD, composites, aerodynamics
- **Community Leadership:** BECI member, meetup founder, gaming community
- **Athletics:** Triathlon, skiing, cycling
- **Culinary Arts:** Coffee roasting, high-end cooking

#### 5.3 Approach & Philosophy
- Multidisciplinary problem-solving
- "Zero to One" methodology
- Creating Tomorrow, Today

**Visual Elements:**
- Professional headshot
- Photography from tempsdarret.studio
- Athletic/hobby images
- Timeline or visual journey

---

### 5. CONTACT (`/contact`)

**Purpose:** Get in touch, project inquiries, consultation requests

**Content:**
- Contact form
- Email: romain@zerotoone.solutions
- LinkedIn / GitHub links
- Availability status (e.g., "Accepting new projects Q1 2025")
- Project inquiry questionnaire

**Form Fields:**
- Name
- Company
- Email
- Project type (dropdown: Architecture, Engineering, AI/ML, Leadership)
- Timeline
- Message
- Budget range (optional)

---

## Secondary Pages (Future Phases)

### 7. RESOURCES (`/resources`) - Future Phase

**Purpose:** Thought leadership, blog, insights

**Subsections:**
- Articles
- Case study insights (extended content from Work section)
- Framework recommendations
- Migration checklists
- Technology radar

**Inspiration:** Instrument "Perspectives" + McKinsey "Insights"

---

### 8. CAREERS (`/careers`) - Future Phase (if scaling)

**Purpose:** Join the team

**Content:**
- Open positions
- Culture & values
- Application process

---

## Navigation Behavior

### Desktop Navigation
- Horizontal top bar (Instrument-style, not traditional navbar)
- Sticky on scroll
- Hover reveals dropdown for IN-HOUSE (Products / Companies)
- Current page highlighted with brand gradient

### Mobile Navigation
- Hamburger menu
- Full-screen overlay when opened
- Large touch targets
- Collapsible section for IN-HOUSE

---

## URL Structure

```
/                           # Homepage
/work                       # All work (filterable by category)
/work/nike                  # Deep case study
/work/ibm                   # Deep case study
/work/philips               # Deep case study
/work/levis                 # Lightweight case study
/work/engie                 # Lightweight case study
/work/elia                  # Lightweight case study

/in-house                   # In-house overview
/in-house/products          # Internal products
/in-house/companies         # Venture portfolio

/about                      # About Romain
/contact                    # Contact form
```

---

## Information Architecture Principles

1. **Clear Hierarchy:** Work (what we've done) → Services (what we do) → Contact (work with us)
2. **Trust First:** Logo grid on homepage, metrics in case studies
3. **Depth on Demand:** Quick scan on listing pages, deep dive on individual pages
4. **Multidisciplinary:** "Beyond Architecture" section shows full person, not just consultant
5. **Expertise Demonstration:** Deep case studies prove thinking, not just execution

---

**Last Updated:** 2025-12-29
