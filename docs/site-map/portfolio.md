# Portfolio (/portfolio) - "What We Build"

**Route:** `/portfolio`

**File:** `src/routes/portfolio/+page.svelte`

**Last Updated:** 2025-12-26

---

## Purpose & Ethos

### Primary Purpose
**Prove capability across all domains** through concrete projects. Show Nike/IBM credibility alongside venture building and experiments—all with equal weight.

### Page Ethos
**"Everything together. Filter to find what matters to you."**

- No hierarchy (consulting isn't "more important" than ventures)
- Visitor self-selects via filtering
- Specific impact metrics (not generic descriptions)
- External proof where possible (links to live ventures, GitHub, etc.)

---

## Target Audiences & Filtering Strategy

| Audience | Enters Via | Uses Filter | Looking For |
|----------|-----------|-------------|-------------|
| **Enterprise Buyer** | Homepage or Google | "Consulting" | Nike, IBM, Philips proof |
| **Startup Founder** | LinkedIn | "Ventures" OR "Consulting" | Proof of building + scale experience |
| **Venture Partner** | Direct link | "Ventures" | Portfolio companies, traction |
| **Recruiter/Peer** | LinkedIn | "All" | Full range of capabilities |

---

## Filtering System

### Filter Options
```
[All Projects] [Consulting] [Ventures] [Experiments]
```

**Why 4 filters (not 3 or 5):**
- **Consulting:** Enterprise transformations (Nike, IBM, Philips, ABVV)
- **Ventures:** Companies we're building (aerowheelcase, tempsdarret.studio, sports R&D)
- **Experiments:** Side projects, open source, community (NHL sim, meetup, GitHub)
- **All:** Default view (shows range)

**URL Integration:**
- `/portfolio` → All projects
- `/portfolio?filter=consulting` → Consulting only
- `/portfolio?filter=ventures` → Ventures only
- `/portfolio?filter=experiments` → Experiments only

**Shareable:** Filter state in URL means links are shareable (LinkedIn post can link directly to consulting projects)

---

## Project Categories & Content

### Consulting Projects (4 main)

**1. Nike - Supply Chain Transformation**
- **Type:** Enterprise Platform
- **Role:** Lead Solution Architect
- **Impact:** Global supply chain modernization, SAP S4/HANA integration, 12-person team leadership
- **Technologies:** AWS, SAP S4/HANA, Event-Driven Architecture, Microservices
- **Year:** 2021-2022

**2. IBM - Data Engineering at Scale**
- **Type:** Enterprise Architecture
- **Role:** Solution Architect
- **Impact:** Real-time analytics platform, IoT integration, automated energy reporting
- **Technologies:** Data Engineering, Real-time Analytics, ELK Stack, IoT
- **Year:** 2019-2021

**3. Philips - HealthSuite Digital Platform**
- **Type:** Healthcare Platform
- **Role:** Platform Architect
- **Impact:** FHIR-compliant platform, medical device integration (IEC 62304), secure patient data
- **Technologies:** Healthcare IT, FHIR, IEC 62304, Compliance
- **Year:** 2018-2019

**4. ABVV-FGTB - AS400 Modernization**
- **Type:** Legacy Modernization
- **Role:** Solution Architect
- **Impact:** 30-year-old system modernization, Keycloak/AD integration, data model redesign
- **Technologies:** AS400 Migration, Cloud Architecture, Keycloak, Active Directory
- **Year:** 2020-2021

---

### Venture Companies (3 main)

**1. Aerowheelcase**
- **Type:** Physical Product Venture
- **Description:** Carbon fiber wheel cases for cyclists—combining materials engineering with product design and e-commerce
- **Role:** Founder
- **Status:** Active Development
- **Technologies:** Carbon Fiber, Product Design, E-commerce, Manufacturing
- **Link:** [aerowheelcase.com] (update with actual URL)

**2. tempsdarret.studio**
- **Type:** Creative Services
- **Description:** Photography studio demonstrating creative visual storytelling and aesthetic discipline
- **Role:** Founder / Photographer
- **Status:** Active
- **Technologies:** Photography, Visual Design, Creative Direction
- **Link:** https://tempsdarret.studio

**3. Sports Equipment R&D**
- **Type:** Product Development
- **Description:** Multiple projects in sporting equipment development and commercialization. Engineering research in 3D CAD, composites, aerodynamics.
- **Role:** Founder / Engineer
- **Status:** Multiple Projects in Development
- **Technologies:** 3D CAD, Composite Materials, Aerodynamics, Product Design

---

### Experiments & Side Projects (3 main)

**1. 3-Point NHL Standing System**
- **Type:** Analytics & Simulation
- **Description:** Simulation analyzing NHL standings with 3-point game system (IIHF model)
- **Technologies:** Vue.js, Node.js, Sports Analytics, Data Visualization
- **Link:** https://github.com/romdj/3point-game-nhl-standing

**2. Eindhoven Technology Meetup**
- **Type:** Community Leadership
- **Description:** Founded and co-organized tech meetup fostering innovation in Eindhoven community
- **Technologies:** Community Building, Event Organization, Networking
- **Link:** https://www.meetup.com/Eindhoven-Technology-Meetup-Group/

**3. Open Source Contributions**
- **Type:** Code & Tools
- **Description:** Various GitHub repositories, technical experiments, framework explorations
- **Technologies:** Various
- **Link:** https://github.com/romdj

---

## Project Card Structure

### Consulting Project Card Template
```
┌──────────────────────────────────────┐
│ [Enterprise Platform]  [Nike]        │
│                                      │
│ Nike Supply Chain Transformation    │
│                                      │
│ Led 12-person team building event-  │
│ driven supply chain platform...      │
│                                      │
│ Role: Lead Solution Architect        │
│                                      │
│ Impact:                              │
│ • Global supply chain modernization  │
│ • SAP S4/HANA integration success    │
│ • 12-person team leadership          │
│                                      │
│ [AWS] [SAP] [Event-Driven] [...]    │
│                                      │
│ 2021-2022                            │
└──────────────────────────────────────┘
```

### Venture Project Card Template
```
┌──────────────────────────────────────┐
│ [Physical Product]  [Aerowheelcase]  │
│                                      │
│ Aerowheelcase                        │
│                                      │
│ Carbon fiber wheel cases for         │
│ cyclists. From concept to commerce.  │
│                                      │
│ Role: Founder                        │
│ Status: Active Development           │
│                                      │
│ [Carbon Fiber] [Product Design]      │
│ [E-commerce] [Manufacturing]         │
│                                      │
│ [Visit Site →]                       │
└──────────────────────────────────────┘
```

**Ethos:** Consistent format regardless of category. Consulting and ventures get equal visual treatment.

---

## Key Messages

### Hero Message
**"Portfolio: What We Build"**

**Supporting:**
"Enterprise platforms. Venture companies. Experiments. Physical products. It's all building. It's all here."

**Why This Works:**
- Lists categories without hierarchy
- "It's all building" reinforces unified identity
- "It's all here" = comprehensive (nothing hidden)

### After Filtering
When filtered, update hero:
- **Consulting:** "Enterprise Transformations: Platforms Built for Nike, IBM, Philips"
- **Ventures:** "Venture Companies: Building Products, Not Just Advising"
- **Experiments:** "Experiments & Open Source: Building in Public"

---

## Success Metrics

### Filter Usage
- **Filter engagement:** > 40% of visitors use filtering
- **Distribution:** Clicks spread across all 3 filters (not 90% on one)
- **Consulting filter:** > 50% of enterprise buyers use it
- **Ventures filter:** > 60% of venture partners use it

### Project Engagement
- **Projects viewed:** > 3 per interested session
- **Time per project:** > 90 seconds average
- **External clicks:** > 20% click through to venture sites or GitHub
- **Scroll depth:** > 70% reach at least 3rd project

### Conversion
- **CTA clicks:** > 20% click "Start a Conversation" or "See How We Work"
- **Services page visits:** > 30% navigate to /services after viewing portfolio
- **Studio page visits:** > 15% navigate to /studio (curious about journey)

### Quality (User Testing - Quarterly)
- **Partner recall:** > 70% remember at least 2 company names (Nike, IBM, Philips)
- **Range perception:** > 60% say "more than just a consultant"
- **Credibility:** > 80% say "can handle enterprise-scale work"

---

## Tone & Voice

### Do's ✅
- **Specific impact:** "Global supply chain modernization" not "successful project"
- **Role clarity:** "Lead Solution Architect" not "worked on project"
- **Equal weight:** Ventures described with same detail as consulting
- **Proof:** Links to live sites, GitHub repos where possible

### Don'ts ❌
- **Generic claims:** "Delivered value" or "exceeded expectations"
- **Hiding ventures:** Making them seem less important
- **Overstating:** "Revolutionized Nike's entire business"
- **Tech jargon without context:** List technologies, but explain impact

---

## Technical Notes

### Filtering Implementation
```svelte
<script>
  let activeFilter = 'all';

  const projects = [
    { id: 'nike', category: 'consulting', ... },
    { id: 'aerowheelcase', category: 'ventures', ... },
    // ...
  ];

  $: filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);
</script>

<button
  class:active={activeFilter === 'consulting'}
  on:click={() => activeFilter = 'consulting'}
>
  Consulting Projects
</button>

{#each filteredProjects as project}
  <ProjectCard {project} />
{/each}
```

### URL Sync
```javascript
// On mount, read ?filter= param
onMount(() => {
  const urlFilter = $page.url.searchParams.get('filter');
  if (urlFilter) activeFilter = urlFilter;
});

// On filter change, update URL
function setFilter(filter) {
  activeFilter = filter;
  window.history.replaceState({}, '', `/portfolio?filter=${filter}`);
}
```

### Anchor Links
Each project card has `id={project.id}` for direct linking:
- `/portfolio#nike` → Jumps to Nike project
- `/portfolio?filter=ventures#aerowheelcase` → Filter + jump combo

---

## Mobile Considerations

- **Filter buttons:** Stack vertically on < 768px, full width
- **Project cards:** Single column on < 600px
- **Images:** Lazy load (only load what's visible)
- **Performance:** Limit initial render to 6 cards, "Load More" button

---

## Related Pages

**Common Paths:**
- Portfolio → `/services` (after seeing proof, want to work together)
- Portfolio → `/studio` (curious about journey/approach)
- Portfolio → `/contact` (ready to engage)
- Portfolio → External sites (aerowheelcase.com, tempsdarret.studio, GitHub)

---

**Last Updated:** 2025-12-26
