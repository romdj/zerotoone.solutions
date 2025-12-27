# Implementation Plan: Option 4 - Integrated Portfolio ("Builder" Identity)

**Date:** 2025-12-26
**Sitemap:** Option 4 - "We Build Solutions—From Code to Companies"
**Timeline:** 3 weeks to launch-ready
**Philosophy:** Unified builder identity across all domains

---

## Strategic Positioning

**Primary Message:** "I'm a builder. Period."
- Consulting = building enterprise platforms
- Ventures = building companies
- Side projects = building experiments
- It's all the same capability applied to different domains

**Target Audiences:**
1. Enterprise buyers (50%) - "He's built platforms for Nike/IBM"
2. Startup founders (30%) - "He builds, not just advises"
3. Venture partners (20%) - "Prolific multi-domain builder"

---

## Final Sitemap Structure

```
Navigation: [Logo] Portfolio | Services | Studio | Insights | [Let's Build]

├─ HOME (/)
│   Hero: "We Build Solutions—From Code to Companies"
│
├─ PORTFOLIO (/portfolio)
│   Filterable: [All] [Consulting] [Ventures] [Experiments]
│   Everything together: Nike + Aerowheelcase + Side Projects
│
├─ SERVICES (/services)
│   All offerings in one place:
│   - Enterprise Consulting
│   - Startup Advisory
│   - Venture Building (co-building)
│   - Incubator
│
├─ STUDIO (/studio)
│   About + Incubator + Vision combined
│
├─ INSIGHTS (/insights)
│   Thought leadership (building + transforming)
│
└─ CONTACT (/contact)
    "Let's build something together"
```

---

## File Structure Reorganization

### Current State (Before)
```
src/routes/
├─ +page.svelte                    [Homepage with wireframe]
├─ +layout.svelte
├─ solutions/+page.svelte          [Orphaned]
├─ portfolio/+page.svelte          [Side projects - wrong content]
├─ about/+page.svelte              [90% placeholder]
├─ incubator/+page.svelte          [Orphaned]
├─ resources/+page.svelte          [Orphaned]
├─ services/+page.svelte           [Empty route]
├─ storyline/+page.svelte          [Strategic narratives]
└─ contact/+page.svelte            [Placeholder]
```

### Target State (After)
```
src/routes/
├─ +page.svelte                    [NEW: "We Build" homepage]
├─ +layout.svelte                  [Update navigation]
├─ portfolio/+page.svelte          [REBUILD: Everything together with filtering]
├─ services/+page.svelte           [REBUILD: All offerings]
├─ studio/+page.svelte             [NEW: About + Incubator + Vision]
├─ insights/+page.svelte           [RENAME from resources, populate]
└─ contact/+page.svelte            [REBUILD: Unified form]

ARCHIVE (move to /old-routes):
├─ solutions/                      [Content merged into /services]
├─ incubator/                      [Content merged into /studio]
├─ about/                          [Content merged into /studio]
├─ storyline/                      [Content moved to /insights articles]
```

### Commands to Execute

```bash
# Create archive directory
mkdir -p src/routes/_archive

# Archive old routes
mv src/routes/solutions src/routes/_archive/
mv src/routes/about src/routes/_archive/
mv src/routes/incubator src/routes/_archive/
mv src/routes/storyline src/routes/_archive/

# Rename resources to insights
mv src/routes/resources src/routes/insights

# Create new studio route
mkdir -p src/routes/studio

# Clean up empty services
rm -rf src/routes/services
mkdir -p src/routes/services

# Routes remaining to rebuild:
# - src/routes/+page.svelte (homepage)
# - src/routes/portfolio/+page.svelte
# - src/routes/services/+page.svelte
# - src/routes/studio/+page.svelte (new)
# - src/routes/insights/+page.svelte (renamed, populate)
# - src/routes/contact/+page.svelte
```

---

## Navigation Update

### File: `src/lib/components/navigation/navigationUtils.ts`

**Replace:**
```typescript
export const navItems: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/storyline', label: 'Our Story' },
  { href: '/contact', label: 'See how we work', isCTA: true }
];
```

**With:**
```typescript
export const navItems: NavItem[] = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/studio', label: 'Studio' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: "Let's Build", isCTA: true }
];
```

---

## Page-by-Page Build Plan

### Priority Order

**Week 1: Core Foundation (MVP)**
1. Update navigation ✅
2. Homepage (/)
3. Portfolio (/portfolio)
4. Services (/services)
5. Contact (/contact)

**Week 2: Complete Experience**
6. Studio (/studio)
7. Polish & refinement

**Week 3: Content & Optimization**
8. Insights (/insights) content
9. Analytics setup
10. Launch

---

## Page 1: Homepage (/) - "We Build"

### File: `src/routes/+page.svelte`

### Content Structure

```svelte
<script lang="ts">
  import '$lib/styles/homepage.css';
</script>

<svelte:head>
  <title>Zero to One Solutions - We Build Solutions, From Code to Companies</title>
  <meta name="description" content="Multi-domain builder: Enterprise platforms for Nike & IBM, venture companies like aerowheelcase, and everything in between." />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <h1>We Build Solutions—From Code to Companies</h1>
  <p class="tagline">
    Multi-domain builder combining enterprise-grade architecture
    with entrepreneurial execution.
  </p>
  <p class="subtitle">
    Sometimes we build platforms for Nike and IBM.<br>
    Sometimes we build our own ventures.<br>
    Always, we build with our hands.
  </p>
  <div class="hero-ctas">
    <a href="/portfolio" class="btn-primary">See What We Build</a>
    <a href="/services" class="btn-secondary">Work With Us</a>
  </div>
</section>

<!-- What We Build - 4 Categories -->
<section class="what-we-build">
  <h2>What We Build</h2>
  <div class="build-grid">

    <div class="build-card">
      <div class="icon">🏢</div>
      <h3>Enterprise Platforms</h3>
      <p>Scalable systems for companies like Nike, IBM, and Philips</p>
      <a href="/portfolio?filter=consulting">View Projects →</a>
    </div>

    <div class="build-card">
      <div class="icon">🚀</div>
      <h3>Venture Companies</h3>
      <p>Our own businesses: carbon fiber products, photography studio, sports equipment</p>
      <a href="/portfolio?filter=ventures">View Ventures →</a>
    </div>

    <div class="build-card">
      <div class="icon">🔬</div>
      <h3>Open Source & Tools</h3>
      <p>Experiments, frameworks, and contributions to the community</p>
      <a href="/portfolio?filter=experiments">View Experiments →</a>
    </div>

    <div class="build-card">
      <div class="icon">🏗️</div>
      <h3>Physical Products</h3>
      <p>Engineering research: 3D CAD, composites, aerodynamics</p>
      <a href="/portfolio?filter=physical">View R&D →</a>
    </div>

  </div>
</section>

<!-- Trusted By / Built For -->
<section class="trusted-by">
  <p class="eyebrow">Built For</p>
  <div class="company-logos">
    <div class="company">Nike</div>
    <div class="company">IBM</div>
    <div class="company">Philips</div>
    <div class="company">Levi's</div>
    <div class="company">Engie</div>
    <div class="company">ABVV-FGTB</div>
  </div>
  <p class="caption">
    8+ years building enterprise-grade systems at scale
  </p>
</section>

<!-- Featured Projects Preview -->
<section class="featured-projects">
  <h2>Featured Builds</h2>
  <div class="featured-grid">

    <!-- Nike Project Card -->
    <div class="project-card">
      <div class="project-type">Enterprise Platform</div>
      <h3>Nike Supply Chain Transformation</h3>
      <p>Led 12-person team building event-driven supply chain platform with SAP S4/HANA integration</p>
      <div class="tech-stack">AWS • SAP • Event-Driven Architecture</div>
      <a href="/portfolio#nike">View Project →</a>
    </div>

    <!-- Aerowheelcase Card -->
    <div class="project-card">
      <div class="project-type">Venture Company</div>
      <h3>Aerowheelcase</h3>
      <p>Carbon fiber wheel cases for cyclists—combining engineering expertise with product design</p>
      <div class="tech-stack">Carbon Fiber • Product Design • E-commerce</div>
      <a href="/portfolio#aerowheelcase">View Venture →</a>
    </div>

    <!-- tempsdarret.studio Card -->
    <div class="project-card">
      <div class="project-type">Creative Services</div>
      <h3>tempsdarret.studio</h3>
      <p>Photography studio demonstrating creative problem-solving and aesthetic discipline</p>
      <div class="tech-stack">Photography • Visual Design • Creative Direction</div>
      <a href="https://tempsdarret.studio" target="_blank">Visit Studio →</a>
    </div>

  </div>
  <div class="view-all">
    <a href="/portfolio" class="btn-secondary">View All Projects</a>
  </div>
</section>

<!-- Philosophy / Approach Teaser -->
<section class="philosophy-preview">
  <div class="content-box">
    <h2>Why We Build Across Domains</h2>
    <p>
      The best solutions come from cross-pollination. Enterprise architecture
      teaches us how to scale ventures. Building products teaches us how to
      ship fast for enterprises. Photography teaches us creative problem-solving.
      Athletics teaches us discipline.
    </p>
    <p>
      It's all connected. It's all building.
    </p>
    <a href="/studio">Learn More About Our Approach →</a>
  </div>
</section>

<!-- Final CTA -->
<section class="final-cta">
  <h2>Let's Build Something Together</h2>
  <p>Enterprise platform? New venture? Something in between?</p>
  <div class="cta-buttons">
    <a href="/contact" class="btn-primary">Start a Conversation</a>
    <a href="/services" class="btn-secondary">See How We Work</a>
  </div>
</section>
```

### Content Requirements

**Write:**
- [ ] Hero copy (already drafted above)
- [ ] 4 "What We Build" descriptions
- [ ] 3 Featured project summaries (Nike, aerowheelcase, tempsdarret.studio)
- [ ] Philosophy teaser (2-3 paragraphs)

**Gather:**
- [ ] Company logos (Nike, IBM, Philips, Levi's, Engie, ABVV) or use text treatment
- [ ] Project images (if available)

**Time Estimate:** 6-8 hours (design + content + implementation)

---

## Page 2: Portfolio (/portfolio) - Everything Together

### File: `src/routes/portfolio/+page.svelte`

### Content Structure

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // Filter state
  let activeFilter = 'all';

  onMount(() => {
    // Check URL param: /portfolio?filter=consulting
    const urlFilter = $page.url.searchParams.get('filter');
    if (urlFilter) {
      activeFilter = urlFilter;
    }
  });

  // Project data
  const projects = [
    // Consulting Projects
    {
      id: 'nike',
      category: 'consulting',
      type: 'Enterprise Platform',
      title: 'Nike Supply Chain Transformation',
      company: 'Nike',
      description: 'Led 12-person team building event-driven supply chain platform with SAP S4/HANA integration. Architected scalable microservices handling global supply chain operations.',
      role: 'Lead Solution Architect',
      impact: [
        'Global supply chain modernization',
        'Successful SAP S4/HANA integration',
        'Cross-functional team leadership (12 engineers)'
      ],
      technologies: ['AWS', 'SAP S4/HANA', 'Event-Driven Architecture', 'Microservices'],
      year: '2021-2022'
    },
    {
      id: 'ibm',
      category: 'consulting',
      type: 'Enterprise Architecture',
      title: 'IBM Data Engineering at Scale',
      company: 'IBM',
      description: 'Designed and implemented real-time data pipelines and analytics infrastructure for enterprise clients. Built IoT solutions and automated reporting systems.',
      role: 'Solution Architect',
      impact: [
        'Real-time analytics platform',
        'IoT integration for industrial clients',
        'Automated energy reporting for data science teams'
      ],
      technologies: ['Data Engineering', 'Real-time Analytics', 'ELK Stack', 'IoT'],
      year: '2019-2021'
    },
    {
      id: 'philips',
      category: 'consulting',
      type: 'Healthcare Platform',
      title: 'Philips HealthSuite Digital Platform',
      company: 'Philips',
      description: 'Contributed to healthcare platform architecture navigating medical device compliance (IEC 62304) and FHIR standards. Built medically compliant systems.',
      role: 'Platform Architect',
      impact: [
        'FHIR-compliant healthcare platform',
        'Medical device integration (IEC 62304)',
        'Secure patient data handling'
      ],
      technologies: ['Healthcare IT', 'FHIR', 'IEC 62304', 'Compliance'],
      year: '2018-2019'
    },
    {
      id: 'abvv',
      category: 'consulting',
      type: 'Legacy Modernization',
      title: 'ABVV-FGTB AS400 Modernization',
      company: 'ABVV-FGTB',
      description: 'Transformed 30-year-old AS400 system to modern cloud architecture. Redesigned data models, implemented Keycloak/AD integration, managed stakeholder communications.',
      role: 'Solution Architect',
      impact: [
        'Legacy system modernization (30+ years old)',
        'Modern authentication (Keycloak/AD)',
        'Data model redesign'
      ],
      technologies: ['AS400 Migration', 'Cloud Architecture', 'Keycloak', 'Active Directory'],
      year: '2020-2021'
    },

    // Venture Companies
    {
      id: 'aerowheelcase',
      category: 'ventures',
      type: 'Physical Product Venture',
      title: 'Aerowheelcase',
      company: 'Aerowheelcase',
      description: 'Carbon fiber wheel cases for cyclists. Combining advanced materials engineering with product design and e-commerce. From concept to commercialization.',
      role: 'Founder',
      status: 'Active Development',
      technologies: ['Carbon Fiber', 'Product Design', 'E-commerce', 'Manufacturing'],
      link: 'https://aerowheelcase.com' // Update with actual URL
    },
    {
      id: 'tempsdarret',
      category: 'ventures',
      type: 'Creative Services',
      title: 'tempsdarret.studio',
      company: 'tempsdarret.studio',
      description: 'Photography studio focused on creative visual storytelling. Demonstrates aesthetic discipline and attention to detail that informs all building work.',
      role: 'Founder / Photographer',
      status: 'Active',
      technologies: ['Photography', 'Visual Design', 'Creative Direction'],
      link: 'https://tempsdarret.studio'
    },
    {
      id: 'sports-equipment',
      category: 'ventures',
      type: 'Product Development',
      title: 'Sports Equipment R&D',
      company: 'Internal Ventures',
      description: 'Multiple projects in sporting equipment development and commercialization. Engineering research in 3D CAD, composite materials, and aerodynamics.',
      role: 'Founder / Engineer',
      status: 'Multiple Projects in Development',
      technologies: ['3D CAD', 'Composite Materials', 'Aerodynamics', 'Product Design']
    },

    // Experiments & Side Projects
    {
      id: 'nhl-simulation',
      category: 'experiments',
      type: 'Analytics & Simulation',
      title: '3-Point NHL Standing System',
      description: 'Simulation of what-if scenarios if NHL adopted the 3-point game system used in international hockey (IIHF). Data analysis and sports analytics.',
      technologies: ['Vue.js', 'Node.js', 'Sports Analytics', 'Data Visualization'],
      link: 'https://github.com/romdj/3point-game-nhl-standing'
    },
    {
      id: 'meetup',
      category: 'experiments',
      type: 'Community Leadership',
      title: 'Eindhoven Technology Meetup',
      description: 'Founded and co-organized technology meetup group fostering innovation and networking in the Eindhoven tech community.',
      technologies: ['Community Building', 'Event Organization', 'Networking'],
      link: 'https://www.meetup.com/Eindhoven-Technology-Meetup-Group/'
    }
  ];

  // Filter logic
  $: filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  function setFilter(filter: string) {
    activeFilter = filter;
    // Update URL without reload
    window.history.replaceState({}, '', `/portfolio?filter=${filter}`);
  }
</script>

<svelte:head>
  <title>Portfolio - Zero to One Solutions</title>
  <meta name="description" content="From enterprise platforms for Nike and IBM to venture companies and experiments—see the full range of what we build." />
</svelte:head>

<main class="portfolio">

  <!-- Hero -->
  <section class="hero">
    <h1>Portfolio: What We Build</h1>
    <p class="subtitle">
      Enterprise platforms. Venture companies. Experiments. Physical products.<br>
      It's all building. It's all here.
    </p>
  </section>

  <!-- Filter Bar -->
  <section class="filter-bar">
    <button
      class="filter-btn"
      class:active={activeFilter === 'all'}
      on:click={() => setFilter('all')}
    >
      All Projects
    </button>
    <button
      class="filter-btn"
      class:active={activeFilter === 'consulting'}
      on:click={() => setFilter('consulting')}
    >
      Consulting Projects
    </button>
    <button
      class="filter-btn"
      class:active={activeFilter === 'ventures'}
      on:click={() => setFilter('ventures')}
    >
      Venture Companies
    </button>
    <button
      class="filter-btn"
      class:active={activeFilter === 'experiments'}
      on:click={() => setFilter('experiments')}
    >
      Experiments & Side Projects
    </button>
  </section>

  <!-- Projects Grid -->
  <section class="projects-grid">
    {#each filteredProjects as project (project.id)}
      <article class="project-card" id={project.id}>

        <div class="project-header">
          <span class="project-type">{project.type}</span>
          {#if project.company}
            <span class="project-company">{project.company}</span>
          {/if}
        </div>

        <h2>{project.title}</h2>

        <p class="description">{project.description}</p>

        {#if project.role}
          <div class="role">
            <strong>Role:</strong> {project.role}
          </div>
        {/if}

        {#if project.impact}
          <div class="impact">
            <strong>Impact:</strong>
            <ul>
              {#each project.impact as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if project.status}
          <div class="status">
            <strong>Status:</strong> {project.status}
          </div>
        {/if}

        <div class="technologies">
          {#each project.technologies as tech}
            <span class="tech-badge">{tech}</span>
          {/each}
        </div>

        {#if project.year}
          <div class="year">{project.year}</div>
        {/if}

        {#if project.link}
          <a href={project.link} class="project-link" target="_blank" rel="noopener">
            View Project →
          </a>
        {/if}

      </article>
    {/each}
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <h2>Ready to Build Together?</h2>
    <p>Whether it's an enterprise transformation or a new venture, let's talk.</p>
    <div class="cta-buttons">
      <a href="/contact" class="btn-primary">Start a Conversation</a>
      <a href="/services" class="btn-secondary">See How We Work</a>
    </div>
  </section>

</main>

<style>
  /* Filter styling */
  .filter-bar {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 3rem 0;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid #ddd;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filter-btn:hover {
    border-color: #F11759;
    color: #F11759;
  }

  .filter-btn.active {
    background: linear-gradient(135deg, #F11759, #8333C5);
    color: white;
    border-color: transparent;
  }

  /* Project grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .project-card {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 2rem;
    background: white;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }

  .tech-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: #f7fafc;
    border-radius: 999px;
    font-size: 0.875rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
```

### Content Requirements

**Gather Project Data:**
- [ ] Nike project details, impact metrics
- [ ] IBM project details
- [ ] Philips project details
- [ ] ABVV project details
- [ ] Levi's, Engie project info (if including)
- [ ] Aerowheelcase description, status, link
- [ ] tempsdarret.studio description
- [ ] Sports equipment R&D current projects

**Time Estimate:** 8-10 hours (filtering logic + project content + styling)

---

## Page 3: Services (/services) - All Offerings

### File: `src/routes/services/+page.svelte`

### Content Structure

```svelte
<svelte:head>
  <title>Services - Zero to One Solutions</title>
  <meta name="description" content="Enterprise consulting, startup advisory, venture building, and incubator programs—all offerings in one place." />
</svelte:head>

<main class="services">

  <!-- Hero -->
  <section class="hero">
    <h1>How We Work With You</h1>
    <p class="subtitle">
      Whether you're transforming an enterprise, scaling a startup,
      or building a new venture—we build alongside you.
    </p>
  </section>

  <!-- Services Grid -->
  <section class="services-grid">

    <!-- Enterprise Consulting -->
    <div class="service-card">
      <div class="icon">🏢</div>
      <h2>Enterprise Consulting</h2>
      <p class="description">
        Transform complex legacy systems into modern, scalable architectures.
        We've built platforms for Nike, IBM, and Philips—bringing enterprise-grade
        expertise to your transformation.
      </p>

      <h3>What We Do:</h3>
      <ul>
        <li>Legacy modernization (AS400, mainframe → cloud)</li>
        <li>Cloud architecture & integration (AWS, Azure, SAP)</li>
        <li>Healthcare compliance (FHIR, IEC 62304)</li>
        <li>Data engineering & real-time analytics</li>
      </ul>

      <h3>Who This Is For:</h3>
      <ul>
        <li>Enterprises with 20+ year old systems needing modernization</li>
        <li>Companies integrating SAP, legacy systems, or complex platforms</li>
        <li>Organizations navigating compliance (healthcare, finance)</li>
      </ul>

      <div class="proof">
        <strong>Proven at:</strong> Nike, IBM, Philips, ABVV-FGTB, Levi's, Engie
      </div>

      <a href="/portfolio?filter=consulting" class="btn-secondary">View Enterprise Projects</a>
    </div>

    <!-- Startup Advisory -->
    <div class="service-card">
      <div class="icon">🚀</div>
      <h2>Startup Advisory</h2>
      <p class="description">
        Bring enterprise-grade architecture to your startup from day one.
        Avoid technical debt while moving fast. We've scaled platforms to
        millions of users—now we help startups do the same.
      </p>

      <h3>What We Do:</h3>
      <ul>
        <li>Technology strategy & roadmap</li>
        <li>Architecture consultation (MVP → scale)</li>
        <li>Technical co-founder advisory</li>
        <li>Team building & hiring guidance</li>
      </ul>

      <h3>Who This Is For:</h3>
      <ul>
        <li>Seed to Series A startups (pre-$10M)</li>
        <li>Non-technical founders needing technical leadership</li>
        <li>Technical founders who want enterprise-level guidance</li>
      </ul>

      <div class="proof">
        <strong>Background:</strong> 8+ years at Nike, IBM, Philips + active venture building
      </div>

      <a href="/studio#incubator" class="btn-secondary">Learn About Incubator</a>
    </div>

    <!-- Venture Building (Co-Building) -->
    <div class="service-card">
      <div class="icon">🛠️</div>
      <h2>Venture Building</h2>
      <p class="description">
        We don't just advise—we co-build. Bring your idea, we bring execution.
        Combining enterprise architecture expertise with hands-on building
        (we're building aerowheelcase, tempsdarret.studio, and more).
      </p>

      <h3>What We Do:</h3>
      <ul>
        <li>Co-found and build ventures together</li>
        <li>Hands-on product development (not just advisory)</li>
        <li>Enterprise-grade architecture from day one</li>
        <li>Physical products + digital platforms</li>
      </ul>

      <h3>Who This Is For:</h3>
      <ul>
        <li>Entrepreneurs with validated ideas needing technical execution</li>
        <li>Corporate spinouts needing independent tech leadership</li>
        <li>Visionaries who want a builder, not a consultant</li>
      </ul>

      <div class="proof">
        <strong>Currently Building:</strong> Aerowheelcase, tempsdarret.studio, Sports Equipment R&D
      </div>

      <a href="/portfolio?filter=ventures" class="btn-secondary">View Our Ventures</a>
    </div>

    <!-- Incubator -->
    <div class="service-card">
      <div class="icon">🌱</div>
      <h2>Incubator Program</h2>
      <p class="description">
        Seed-stage support combining angel-like expertise with hands-on involvement.
        We help external founders AND build our own ventures—so we eat our own dog food.
      </p>

      <h3>What We Offer:</h3>
      <ul>
        <li>AI-powered idea generation frameworks</li>
        <li>Architecture & technical strategy</li>
        <li>Angel-like expertise without equity demands (case-by-case)</li>
        <li>Access to enterprise lessons from Nike, IBM, Philips</li>
      </ul>

      <h3>Who We Work With:</h3>
      <ul>
        <li>Seed-stage founders (pre-product or early traction)</li>
        <li>Technical founders needing business guidance</li>
        <li>Non-technical founders needing technical co-founder</li>
        <li>Our own internal ventures (we build too)</li>
      </ul>

      <div class="proof">
        <strong>Model:</strong> We help external founders + build our own ventures
      </div>

      <a href="/studio#incubator" class="btn-primary">Apply to Incubator</a>
    </div>

  </section>

  <!-- The Approach -->
  <section class="approach-section">
    <h2>Our Approach: Enterprise Meets Startup</h2>
    <div class="approach-grid">

      <div class="approach-item">
        <h3>Enterprise-Grade Architecture</h3>
        <p>
          We've built systems handling millions of users at Nike and IBM.
          That discipline comes to every project—whether enterprise or startup.
        </p>
      </div>

      <div class="approach-item">
        <h3>Design Thinking Methodology</h3>
        <p>
          Not just technical—we solve business problems. Combining creative
          problem-solving (from photography, engineering) with technical execution.
        </p>
      </div>

      <div class="approach-item">
        <h3>We Build, Not Just Advise</h3>
        <p>
          We're building our own ventures (aerowheelcase, tempsdarret.studio).
          We use the same frameworks we recommend to clients. We eat our own dog food.
        </p>
      </div>

      <div class="approach-item">
        <h3>Multidisciplinary Problem-Solving</h3>
        <p>
          Photography teaches us aesthetics. Engineering teaches us precision.
          Athletics teaches us discipline. It all informs better building.
        </p>
      </div>

    </div>
  </section>

  <!-- How We Work -->
  <section class="how-we-work">
    <h2>How We Work</h2>

    <div class="work-types">

      <div class="work-type">
        <h3>Enterprise Engagements</h3>
        <ul>
          <li>Assessment & strategy (2-4 weeks)</li>
          <li>Architecture design & roadmap (4-8 weeks)</li>
          <li>Hands-on implementation (3-12 months)</li>
          <li>Team leadership & knowledge transfer</li>
        </ul>
      </div>

      <div class="work-type">
        <h3>Startup Advisory</h3>
        <ul>
          <li>Monthly retainer or project-based</li>
          <li>Technical roadmap & architecture reviews</li>
          <li>Strategic guidance on hiring, tech stack, scaling</li>
          <li>Fractional CTO services available</li>
        </ul>
      </div>

      <div class="work-type">
        <h3>Venture Partnerships</h3>
        <ul>
          <li>Co-founding arrangements (equity-based)</li>
          <li>Joint venture structures</li>
          <li>Build-operate-transfer models</li>
          <li>Incubator program (see below)</li>
        </ul>
      </div>

    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <h2>Let's Discuss Your Challenge</h2>
    <p>
      Not sure which service fits? That's okay. Let's talk about what you're
      building and figure out the right approach together.
    </p>
    <div class="cta-buttons">
      <a href="/contact" class="btn-primary">Start a Conversation</a>
      <a href="/portfolio" class="btn-secondary">View Our Work</a>
    </div>
  </section>

</main>
```

### Content Requirements

**Write:**
- [ ] Service descriptions (already drafted)
- [ ] "How We Work" section details
- [ ] Engagement models (retainer, project, equity)
- [ ] Pricing philosophy (optional)

**Time Estimate:** 4-6 hours

---

## Page 4: Contact (/contact) - Unified Form

### File: `src/routes/contact/+page.svelte`

### Content Structure

```svelte
<script lang="ts">
  let inquiryType = '';
  let name = '';
  let email = '';
  let company = '';
  let message = '';

  function handleSubmit() {
    // Handle form submission
    // Use Formspree, Netlify Forms, or similar
  }
</script>

<svelte:head>
  <title>Contact - Zero to One Solutions</title>
  <meta name="description" content="Let's build something together—whether it's an enterprise transformation, startup, or new venture." />
</svelte:head>

<main class="contact">

  <section class="hero">
    <h1>Let's Build Something Together</h1>
    <p class="subtitle">
      Enterprise platform? New venture? Somewhere in between?<br>
      Tell us what you're building, and let's figure it out together.
    </p>
  </section>

  <section class="contact-form-section">

    <form on:submit|preventDefault={handleSubmit} class="contact-form">

      <!-- What brings you here? -->
      <div class="form-group">
        <label for="inquiry-type">What brings you here? *</label>
        <select id="inquiry-type" bind:value={inquiryType} required>
          <option value="">Select one...</option>
          <option value="enterprise">Enterprise Transformation</option>
          <option value="startup">Startup Technology Strategy</option>
          <option value="venture">Venture Building / Co-Building</option>
          <option value="incubator">Incubator Application</option>
          <option value="partnership">Partnership Opportunity</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>

      <!-- Name -->
      <div class="form-group">
        <label for="name">Name *</label>
        <input
          type="text"
          id="name"
          bind:value={name}
          required
          placeholder="Your name"
        />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email *</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          required
          placeholder="your.email@example.com"
        />
      </div>

      <!-- Company -->
      <div class="form-group">
        <label for="company">Company (optional)</label>
        <input
          type="text"
          id="company"
          bind:value={company}
          placeholder="Your company name"
        />
      </div>

      <!-- Message -->
      <div class="form-group">
        <label for="message">What are you building? *</label>
        <textarea
          id="message"
          bind:value={message}
          rows="6"
          required
          placeholder="Tell us about your challenge, idea, or project..."
        ></textarea>
      </div>

      <!-- Submit -->
      <button type="submit" class="btn-primary">
        Send Message
      </button>

    </form>

    <!-- Alternative contact methods -->
    <div class="alternative-contact">
      <h3>Prefer a different way?</h3>
      <div class="contact-methods">
        <div class="method">
          <strong>Email:</strong>
          <a href="mailto:lussier.romain@gmail.com">lussier.romain@gmail.com</a>
        </div>
        <div class="method">
          <strong>LinkedIn:</strong>
          <a href="https://linkedin.com/in/romainlussier" target="_blank">Connect on LinkedIn</a>
        </div>
        <div class="method">
          <strong>GitHub:</strong>
          <a href="https://github.com/romdj" target="_blank">View GitHub Profile</a>
        </div>
      </div>

      <p class="response-time">
        <strong>Response time:</strong> Usually within 24-48 hours
      </p>
    </div>

  </section>

  <!-- What happens next -->
  <section class="next-steps">
    <h2>What Happens Next?</h2>
    <div class="steps-grid">

      <div class="step">
        <div class="step-number">1</div>
        <h3>We Review</h3>
        <p>We'll read your inquiry and assess how we can help.</p>
      </div>

      <div class="step">
        <div class="step-number">2</div>
        <h3>Initial Call</h3>
        <p>If it's a good fit, we'll schedule a 30-minute discovery call.</p>
      </div>

      <div class="step">
        <div class="step-number">3</div>
        <h3>Proposal</h3>
        <p>We'll outline an approach, timeline, and how we'd work together.</p>
      </div>

      <div class="step">
        <div class="step-number">4</div>
        <h3>Build</h3>
        <p>We start building—whether it's strategy, architecture, or product.</p>
      </div>

    </div>
  </section>

</main>
```

### Implementation Notes

**Form Backend Options:**
1. **Formspree** (easiest): `action="https://formspree.io/f/YOUR_FORM_ID"`
2. **Netlify Forms** (if deploying to Netlify): Add `data-netlify="true"`
3. **Custom API**: Build your own endpoint

**Time Estimate:** 2-3 hours

---

## Page 5: Studio (/studio) - About + Incubator + Vision

### File: `src/routes/studio/+page.svelte`

### Content Structure

```svelte
<svelte:head>
  <title>Studio - Zero to One Solutions</title>
  <meta name="description" content="From enterprise architect to multi-domain builder—our journey, philosophy, and vision." />
</svelte:head>

<main class="studio">

  <!-- Hero -->
  <section class="hero">
    <h1>The Studio: Who We Are</h1>
    <p class="subtitle">
      From enterprise architect to multi-domain builder.<br>
      Here's the journey, the philosophy, and where we're going.
    </p>
  </section>

  <!-- The Journey -->
  <section class="journey">
    <h2>From Consulting to Building</h2>

    <div class="journey-content">
      <p>
        I started as a solution architect at Nike, IBM, and Philips—building
        systems that scale to millions of users. For years, I helped enterprises
        transform their platforms, modernize legacy systems, and architect
        cloud solutions.
      </p>
      <p>
        But I kept thinking: <em>"What if I built my own companies?"</em>
      </p>
      <p>
        So I started building. First aerowheelcase (carbon fiber wheel cases for
        cyclists). Then tempsdarret.studio (photography). Then sports equipment R&D.
        Each venture taught me something consulting couldn't.
      </p>
      <p>
        <strong>Today:</strong> Consulting provides the revenue and teaches me how
        to scale. Ventures provide the learning and prove what works.
      </p>
      <p>
        <strong>Tomorrow:</strong> A full venture studio that applies enterprise-grade
        architecture to new companies—because I've done both.
      </p>
      <p>
        This isn't about abandoning consulting. It's about expanding what "building" means.
      </p>
    </div>
  </section>

  <!-- Professional Background -->
  <section class="background">
    <h2>Where We've Built</h2>

    <div class="experience-timeline">

      <div class="experience">
        <div class="company-logo">Nike</div>
        <h3>Lead Solution Architect</h3>
        <p class="year">2021-2022</p>
        <p>
          Led 12-person team building event-driven supply chain platform with
          SAP S4/HANA integration. Learned how to coordinate cross-functional
          teams and architect for global scale.
        </p>
      </div>

      <div class="experience">
        <div class="company-logo">IBM</div>
        <h3>Solution Architect</h3>
        <p class="year">2019-2021</p>
        <p>
          Designed data engineering pipelines and real-time analytics for
          enterprise clients. Mastered the art of translating technical
          requirements into business value.
        </p>
      </div>

      <div class="experience">
        <div class="company-logo">Philips</div>
        <h3>Platform Architect</h3>
        <p class="year">2018-2019</p>
        <p>
          Contributed to HealthSuite Digital Platform, navigating medical
          device compliance (IEC 62304) and FHIR standards. Discovered the
          intersection of healthcare and technology innovation.
        </p>
      </div>

      <div class="experience">
        <div class="company-logo">ABVV-FGTB</div>
        <h3>Solution Architect</h3>
        <p class="year">2020-2021</p>
        <p>
          Transformed 30-year-old AS400 system to modern cloud architecture.
          Learned that legacy modernization is as much about people as technology.
        </p>
      </div>

    </div>

    <p class="summary">
      <strong>8+ years</strong> building enterprise-grade systems at scale.
      <strong>4 Fortune 500 companies.</strong>
      <strong>6 major transformations led.</strong>
    </p>
  </section>

  <!-- Philosophy: Multidisciplinary Approach -->
  <section class="philosophy">
    <h2>Why We Build Across Domains</h2>

    <div class="philosophy-grid">

      <div class="discipline">
        <div class="icon">📸</div>
        <h3>Photography</h3>
        <p>
          <strong>tempsdarret.studio</strong> teaches creative problem-solving
          and aesthetic discipline. Composition, lighting, storytelling—these
          inform how we design systems.
        </p>
      </div>

      <div class="discipline">
        <div class="icon">🔬</div>
        <h3>Engineering Research</h3>
        <p>
          3D CAD, composite materials, aerodynamics. Building physical products
          teaches precision and manufacturing constraints that software engineers
          often miss.
        </p>
      </div>

      <div class="discipline">
        <div class="icon">🏃</div>
        <h3>Athletics</h3>
        <p>
          Triathlon, skiing, cycling demand discipline and endurance. Long-term
          projects require the same stamina. Building ventures is a marathon,
          not a sprint.
        </p>
      </div>

      <div class="discipline">
        <div class="icon">🎨</div>
        <h3>Design Thinking</h3>
        <p>
          Not just technical—we solve business problems. Combining human-centered
          design with technical execution creates solutions people actually use.
        </p>
      </div>

    </div>

    <div class="philosophy-summary">
      <p>
        <strong>The best solutions come from cross-pollination.</strong>
      </p>
      <p>
        Enterprise architecture teaches us how to scale ventures. Building
        products teaches us how to ship fast for enterprises. Photography
        teaches us creative problem-solving. Athletics teaches us discipline.
      </p>
      <p>
        It's all connected. It's all building.
      </p>
    </div>
  </section>

  <!-- Side Projects & Experiments -->
  <section class="side-projects">
    <h2>Experiments & Side Projects</h2>

    <div class="projects-grid">

      <div class="project">
        <h3>3-Point NHL Standing System</h3>
        <p>
          Simulation of what-if scenarios if NHL adopted the 3-point game
          system used in international hockey. Data analysis meets sports analytics.
        </p>
        <div class="tech">Vue.js, Node.js, Sports Analytics</div>
        <a href="https://github.com/romdj/3point-game-nhl-standing" target="_blank">
          View Project →
        </a>
      </div>

      <div class="project">
        <h3>Eindhoven Technology Meetup</h3>
        <p>
          Founded and co-organized technology meetup group fostering innovation
          and networking in the Eindhoven tech community.
        </p>
        <div class="tech">Community Building, Event Organization</div>
        <a href="https://www.meetup.com/Eindhoven-Technology-Meetup-Group/" target="_blank">
          View Meetup →
        </a>
      </div>

      <div class="project">
        <h3>Open Source Contributions</h3>
        <p>
          Various GitHub contributions, technical experiments, and framework
          explorations. Building in public, learning in public.
        </p>
        <div class="tech">Various Technologies</div>
        <a href="https://github.com/romdj" target="_blank">
          View GitHub →
        </a>
      </div>

    </div>
  </section>

  <!-- Incubator Section -->
  <section class="incubator" id="incubator">
    <h2>Incubator: Building Together</h2>

    <div class="incubator-content">
      <p class="intro">
        We help seed-stage founders AND build our own ventures. This dual
        approach means we eat our own dog food—the frameworks we recommend,
        we use ourselves.
      </p>

      <div class="incubator-grid">

        <div class="incubator-track">
          <h3>For External Founders</h3>
          <p>
            Bring your idea, we bring expertise. We provide:
          </p>
          <ul>
            <li>AI-powered idea generation frameworks</li>
            <li>Architecture & technical strategy</li>
            <li>Angel-like expertise (case-by-case on equity)</li>
            <li>Access to enterprise lessons from Nike, IBM, Philips</li>
          </ul>
          <p class="model">
            <strong>Model:</strong> Advisory retainer, equity partnership,
            or hybrid—depends on the venture and fit.
          </p>
        </div>

        <div class="incubator-track">
          <h3>Our Internal Ventures</h3>
          <p>
            We build our own companies using the same approach:
          </p>
          <ul>
            <li>Aerowheelcase (carbon fiber cycling products)</li>
            <li>Sports equipment R&D (multiple projects)</li>
            <li>Future ventures (ideas in pipeline)</li>
          </ul>
          <p class="model">
            <strong>Why this matters:</strong> We learn by doing, then share
            what works.
          </p>
        </div>

      </div>

      <div class="incubator-philosophy">
        <h3>The Philosophy</h3>
        <p>
          Traditional accelerators batch-process startups. We work closely
          with a few select founders, treating each venture as unique.
          We're hands-on, not hands-off.
        </p>
        <p>
          And because we're building our own ventures, we're in the trenches
          with you—facing the same challenges, solving the same problems.
        </p>
      </div>

      <div class="incubator-cta">
        <h3>Interested in Working Together?</h3>
        <p>
          We're selective about partnerships. If you're a seed-stage founder
          with an idea that needs enterprise-grade execution, let's talk.
        </p>
        <a href="/contact?type=incubator" class="btn-primary">
          Apply to Incubator
        </a>
      </div>
    </div>
  </section>

  <!-- The Vision -->
  <section class="vision">
    <h2>The Long-Term Vision</h2>

    <div class="vision-content">
      <p>
        <strong>Today:</strong> Consulting funds venture experiments.
        Every enterprise engagement teaches us something about scale,
        systems, and people. Every venture teaches us about shipping,
        product-market fit, and entrepreneurship.
      </p>
      <p>
        <strong>Tomorrow:</strong> A full venture studio that applies
        enterprise-grade architecture to new companies. Building in public.
        Sharing frameworks. Creating value across domains.
      </p>
      <p>
        <strong>Always:</strong> Both paths inform each other. Consulting
        makes ventures better. Ventures make consulting better.
      </p>
      <p>
        This transition isn't about abandoning one for the other. It's about
        recognizing that <strong>building is building</strong>—whether it's
        Nike's supply chain or a carbon fiber wheel case.
      </p>
    </div>

    <div class="vision-cta">
      <p>Want to be part of this journey?</p>
      <div class="cta-buttons">
        <a href="/contact" class="btn-primary">Let's Talk</a>
        <a href="/portfolio" class="btn-secondary">See What We're Building</a>
      </div>
    </div>
  </section>

</main>
```

### Content Requirements

**Write:**
- [ ] Journey narrative (consulting → ventures transition)
- [ ] Professional experience summaries (Nike, IBM, Philips, ABVV)
- [ ] Multidisciplinary explanations (photography, engineering, athletics)
- [ ] Incubator program details
- [ ] Vision statement

**Gather:**
- [ ] Company logos or text treatments
- [ ] Timeline dates (verify)
- [ ] Side project links (NHL simulation, meetup, GitHub)

**Time Estimate:** 6-8 hours

---

## Page 6: Insights (/insights) - Content Hub

### File: `src/routes/insights/+page.svelte`

### Content Structure

```svelte
<svelte:head>
  <title>Insights - Zero to One Solutions</title>
  <meta name="description" content="Thoughts on building ventures, transforming enterprises, and everything in between." />
</svelte:head>

<main class="insights">

  <section class="hero">
    <h1>Insights: Building & Transforming</h1>
    <p class="subtitle">
      Lessons from enterprise transformations and venture building.<br>
      What we're learning as we build.
    </p>
  </section>

  <!-- Featured Article (when content exists) -->
  <section class="featured">
    <div class="coming-soon">
      <h2>Content Coming Soon</h2>
      <p>
        We're converting our strategic frameworks and case studies into
        articles. Subscribe to be notified when we publish.
      </p>
    </div>
  </section>

  <!-- Planned Topics -->
  <section class="planned-topics">
    <h2>What We'll Cover</h2>

    <div class="topics-grid">

      <div class="topic-category">
        <h3>Building Ventures</h3>
        <ul>
          <li>Focus on Your Beer: Strategic Differentiation (brewery story)</li>
          <li>Counter-Positioning: When to Go Against the Grain</li>
          <li>Switching Costs: When to Migrate vs. Evolve</li>
          <li>From 0 to 1: Applying Enterprise Architecture to Startups</li>
        </ul>
      </div>

      <div class="topic-category">
        <h3>Enterprise Transformations</h3>
        <ul>
          <li>Nike Supply Chain: Event-Driven Architecture at Scale</li>
          <li>ABVV-FGTB: Modernizing 30-Year-Old AS400 Systems</li>
          <li>Philips Healthcare: Building FHIR-Compliant Platforms</li>
          <li>SAP Integration: Lessons from Large-Scale Migrations</li>
        </ul>
      </div>

      <div class="topic-category">
        <h3>Frameworks & Tools</h3>
        <ul>
          <li>Architecture Decision Framework</li>
          <li>Migration Checklists (AS400, Monolith, Legacy)</li>
          <li>Technology Stack Recommendations</li>
          <li>AI-Powered Idea Generation for Ventures</li>
        </ul>
      </div>

      <div class="topic-category">
        <h3>From the Lab</h3>
        <ul>
          <li>Building Aerowheelcase: Carbon Fiber to Commerce</li>
          <li>Photography Meets Product Design</li>
          <li>Sports Equipment R&D: From CAD to Manufacturing</li>
          <li>Lessons from Building in Public</li>
        </ul>
      </div>

    </div>
  </section>

  <!-- Newsletter Signup -->
  <section class="newsletter">
    <div class="newsletter-box">
      <h2>Get Notified When We Publish</h2>
      <p>
        No spam. Just insights on building ventures and transforming
        enterprises. Unsubscribe anytime.
      </p>

      <form class="newsletter-form" action="#" method="post">
        <input
          type="email"
          placeholder="your.email@example.com"
          required
        />
        <button type="submit" class="btn-primary">
          Subscribe
        </button>
      </form>

      <p class="frequency">
        We publish when we have something worth saying. Usually 1-2x per month.
      </p>
    </div>
  </section>

</main>
```

### Content Requirements

**Week 1:** Launch with placeholder (as above)

**Week 3+:** Convert strategic narratives to articles:
- [ ] "Focus on Your Beer" (brewery/electricity story from old site)
- [ ] "Counter-Positioning" (Dropbox story)
- [ ] "Switching Costs" (SAP & Netflix stories)

**Ongoing:** Add case study deep dives and frameworks

**Time Estimate Week 1:** 2 hours (placeholder page)
**Time Estimate Week 3+:** 4-6 hours per article

---

## Week-by-Week Implementation Schedule

### Week 1: Foundation (Launch-Ready MVP)

**Goal:** Get 5 core pages functional so site is usable

**Monday:**
- [ ] Execute file structure reorganization (1 hour)
- [ ] Update navigation (1 hour)
- [ ] Start homepage build (3 hours)

**Tuesday:**
- [ ] Finish homepage (3 hours)
- [ ] Start Portfolio page (4 hours)

**Wednesday:**
- [ ] Finish Portfolio page (4 hours)
- [ ] Start Services page (3 hours)

**Thursday:**
- [ ] Finish Services page (2 hours)
- [ ] Build Contact page (3 hours)
- [ ] Testing & bug fixes (2 hours)

**Friday:**
- [ ] Polish & refinement (3 hours)
- [ ] Content review (2 hours)
- [ ] Deploy to staging (2 hours)

**Week 1 Deliverable:**
```
✅ Homepage (We Build)
✅ Portfolio (filtered, all projects)
✅ Services (all offerings)
✅ Contact (functional form)
✅ Navigation (working)
```

**Status:** Site is functional and usable, missing Studio page

---

### Week 2: Complete Experience

**Goal:** Add Studio page, polish everything

**Monday-Tuesday:**
- [ ] Build Studio page (8 hours)
  - Journey narrative
  - Professional background
  - Multidisciplinary approach
  - Incubator section
  - Vision

**Wednesday:**
- [ ] Content refinement across all pages (4 hours)
- [ ] Visual polish (design, spacing, colors) (3 hours)

**Thursday:**
- [ ] Cross-page consistency check (2 hours)
- [ ] Mobile responsiveness review (3 hours)
- [ ] User testing (friends/colleagues) (2 hours)

**Friday:**
- [ ] Implement feedback (3 hours)
- [ ] Final polish (2 hours)
- [ ] Prepare for launch (2 hours)

**Week 2 Deliverable:**
```
✅ Studio page (complete)
✅ All pages polished
✅ Mobile-friendly
✅ User-tested
```

**Status:** Site is complete and ready to launch

---

### Week 3: Content & Optimization

**Goal:** Add Insights content, analytics, launch

**Monday-Tuesday:**
- [ ] Convert strategic narratives to articles (8 hours)
  - "Focus on Your Beer"
  - "Counter-Positioning"
  - "Switching Costs"

**Wednesday:**
- [ ] Populate Insights page with articles (4 hours)
- [ ] Set up analytics (Google Analytics, Plausible, etc.) (2 hours)
- [ ] Set up newsletter (Mailchimp, ConvertKit) (1 hour)

**Thursday:**
- [ ] SEO optimization (meta tags, structured data) (3 hours)
- [ ] Performance optimization (images, loading) (2 hours)
- [ ] Final testing (2 hours)

**Friday:**
- [ ] Launch! 🚀
- [ ] Monitor analytics
- [ ] Collect initial feedback

**Week 3 Deliverable:**
```
✅ Insights articles (3 published)
✅ Analytics tracking
✅ Newsletter setup
✅ SEO optimized
✅ LAUNCHED
```

---

## Content Checklist

### Must-Have (Week 1)

**Homepage:**
- [ ] Hero copy
- [ ] 4 "What We Build" descriptions
- [ ] Company logos or text (Nike, IBM, Philips, Levi's, Engie, ABVV)
- [ ] 3 featured project summaries

**Portfolio:**
- [ ] Nike project details
- [ ] IBM project details
- [ ] Philips project details
- [ ] ABVV project details
- [ ] Aerowheelcase description & status
- [ ] tempsdarret.studio description
- [ ] Sports Equipment R&D description
- [ ] Side projects (NHL, meetup)

**Services:**
- [ ] 4 service descriptions (Enterprise, Startup, Venture Building, Incubator)
- [ ] "How We Work" details

**Contact:**
- [ ] Form setup (Formspree or similar)
- [ ] Alternative contact methods

### Nice-to-Have (Week 2)

**Studio:**
- [ ] Journey narrative
- [ ] Professional experience write-ups (Nike, IBM, Philips, ABVV)
- [ ] Multidisciplinary explanations
- [ ] Incubator program details
- [ ] Vision statement

### Future (Week 3+)

**Insights:**
- [ ] 3 strategic narrative articles
- [ ] Case study deep dives (ongoing)
- [ ] Framework templates (ongoing)

---

## Design / Styling Notes

### Brand Colors (from existing)
```css
--brand-pink: #F11759;
--brand-purple: #8333C5;
--brand-orange: #D67D21;
--gradient: linear-gradient(135deg, #F11759, #8333C5, #D67D21);
```

### Typography
```css
font-family: 'Inter', sans-serif;
```

### Key Design Patterns

**Hero Sections:**
- Large headline (3-4rem)
- Subtitle (1.25-1.5rem)
- CTAs below (primary + secondary)

**Card Grids:**
- Grid layout (auto-fit, minmax(350px, 1fr))
- Hover effects (translateY, box-shadow)
- Consistent padding (2rem)

**Filters (Portfolio):**
- Button group with active state
- Gradient background for active
- Smooth transitions

---

## Technical Requirements

### Dependencies (Already Installed)
- SvelteKit ✅
- TypeScript ✅
- Tailwind CSS (hybrid approach) ✅
- PostCSS ✅

### New Dependencies Needed
```bash
# If using Formspree (no install needed, just configure)
# If using Netlify Forms (no install needed, just add attribute)

# Optional: For newsletter
npm install @mailchimp/mailchimp_marketing
# OR use ConvertKit, Substack, etc. (API-based)
```

### Environment Variables
```bash
# .env (create this file)
FORMSPREE_FORM_ID=your_form_id_here
# OR
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_LIST_ID=your_list_id_here
```

---

## Launch Checklist

### Pre-Launch

- [ ] All pages functional
- [ ] Navigation working on all pages
- [ ] Mobile responsive (test on phone)
- [ ] Forms working (test submission)
- [ ] Links verified (no 404s)
- [ ] Images optimized (< 500kb each)
- [ ] Meta tags on all pages
- [ ] Favicon updated

### Launch Day

- [ ] Deploy to production
- [ ] Set up analytics
- [ ] Test contact form (send test email)
- [ ] Share on LinkedIn
- [ ] Update LinkedIn profile link
- [ ] Update GitHub profile link

### Post-Launch (Week 1)

- [ ] Monitor analytics (page views, bounce rate)
- [ ] Collect feedback from 3-5 people
- [ ] Fix any bugs discovered
- [ ] Add Google Search Console
- [ ] Submit sitemap

---

## Success Metrics (First Month)

### Baseline Targets

**Traffic:**
- Unique visitors: 50-100 (if sharing on LinkedIn)
- Page views: 200-400
- Bounce rate: < 60%

**Engagement:**
- Avg time on site: > 2 minutes
- Pages per session: > 2.5
- Portfolio page visits: > 30% of sessions

**Conversion:**
- Contact form submissions: 2-5
- Newsletter signups: 5-10
- LinkedIn/GitHub clicks: > 8%

**Quality Checks:**
- No broken links
- No form errors
- Mobile works perfectly
- Load time < 3 seconds

---

## Risk Mitigation

### What Could Go Wrong?

**Risk 1: Enterprise buyers confused by ventures prominence**
- Mitigation: Services page is second in nav, makes consulting very clear
- Fallback: Can reorder nav if needed (Services before Portfolio)

**Risk 2: Too much content on Portfolio page (overwhelming)**
- Mitigation: Filtering makes it manageable
- Fallback: Can split into separate pages if needed

**Risk 3: "Builder" messaging too vague**
- Mitigation: "What We Build" section on homepage is very specific
- Fallback: Can adjust homepage copy if testing shows confusion

**Risk 4: Week 1 timeline too aggressive**
- Mitigation: Can launch with 4 pages (skip Services, add later)
- Fallback: Extend to 10 days instead of 5

---

## Next Actions

**Immediate (Today):**
1. Review this plan
2. Confirm you're ready to start
3. I'll help execute file structure reorganization
4. We start building Homepage

**Tomorrow:**
- Continue building based on Week 1 schedule

**Questions before we start:**
1. Do you have content ready for Nike, IBM, Philips projects?
2. Do you have aerowheelcase description/status?
3. Do you want to use Formspree for contact form (easiest)?
4. Should we set up newsletter in Week 1 or Week 3?

---

Let me know when you're ready to start, and I'll help you execute! 🚀
