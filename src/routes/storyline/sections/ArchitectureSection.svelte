<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let scrollY = 0;
  export let innerHeight = 0;
  
  let sectionRef: HTMLElement;
  let animationProgress = 0;
  
  onMount(() => {
    if (browser) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / innerHeight));
            animationProgress = progress;
          }
        });
      }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
      
      if (sectionRef) observer.observe(sectionRef);
      
      return () => observer.disconnect();
    }
  });
  
  // Calculate parallax offset
  $: parallaxOffset = (scrollY - (innerHeight * 1.5)) * 0.15;
  
  // Module positions - they assemble from scattered to organized
  $: modulePositions = [
    {
      id: 'core',
      startX: 100, startY: 300,
      endX: 300, endY: 150,
      delay: 0,
      label: 'Core'
    },
    {
      id: 'api',
      startX: 600, startY: 80,
      endX: 300, endY: 80,
      delay: 0.2,
      label: 'API'
    },
    {
      id: 'data',
      startX: 50, startY: 50,
      endX: 450, endY: 150,
      delay: 0.4,
      label: 'Data'
    },
    {
      id: 'ui',
      startX: 700, startY: 350,
      endX: 150, endY: 80,
      delay: 0.6,
      label: 'UI'
    },
    {
      id: 'auth',
      startX: 500, startY: 400,
      endX: 450, endY: 80,
      delay: 0.8,
      label: 'Auth'
    },
    {
      id: 'integration',
      startX: 800, startY: 200,
      endX: 300, endY: 220,
      delay: 1.0,
      label: 'Integration'
    }
  ];
  
  function getModulePosition(module: any, progress: number) {
    const adjustedProgress = Math.max(0, Math.min(1, (progress - module.delay) / 0.8));
    const easeProgress = 1 - Math.pow(1 - adjustedProgress, 3); // Ease out cubic
    
    return {
      x: module.startX + (module.endX - module.startX) * easeProgress,
      y: module.startY + (module.endY - module.startY) * easeProgress,
      scale: 0.5 + (0.5 * easeProgress),
      opacity: 0.3 + (0.7 * easeProgress)
    };
  }
</script>

<section 
  bind:this={sectionRef}
  class="architecture-section storyline-section" 
  style="transform: translateY({parallaxOffset}px)"
>
  <div class="architecture-content">
    <div class="architecture-visual">
      <svg viewBox="0 0 600 400" class="architecture-svg">
        <defs>
          <linearGradient id="moduleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#F11759;stop-opacity:0.8" />
            <stop offset="50%" style="stop-color:#8333C5;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#D67D21;stop-opacity:0.8" />
          </linearGradient>
          
          <filter id="moduleGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Connection lines between modules (appear after modules are in place) -->
        {#if animationProgress > 0.8}
          <g class="module-connections" opacity={Math.max(0, (animationProgress - 0.8) * 5)}>
            <line x1="300" y1="150" x2="300" y2="80" stroke="var(--border-medium)" stroke-width="2" stroke-dasharray="5,5" />
            <line x1="300" y1="150" x2="450" y2="150" stroke="var(--border-medium)" stroke-width="2" stroke-dasharray="5,5" />
            <line x1="300" y1="150" x2="300" y2="220" stroke="var(--border-medium)" stroke-width="2" stroke-dasharray="5,5" />
            <line x1="300" y1="80" x2="150" y2="80" stroke="var(--border-medium)" stroke-width="2" stroke-dasharray="5,5" />
            <line x1="300" y1="80" x2="450" y2="80" stroke="var(--border-medium)" stroke-width="2" stroke-dasharray="5,5" />
          </g>
        {/if}
        
        <!-- Architecture modules -->
        <g class="modules">
          {#each modulePositions as module}
            {@const pos = getModulePosition(module, animationProgress)}
            <g transform="translate({pos.x}, {pos.y}) scale({pos.scale})" opacity={pos.opacity}>
              <rect x="-40" y="-20" width="80" height="40" 
                    rx="8" 
                    fill="url(#moduleGradient)" 
                    filter="url(#moduleGlow)"
                    class="module-rect" />
              <text x="0" y="5" 
                    text-anchor="middle" 
                    class="module-text" 
                    fill="white" 
                    font-size="12" 
                    font-weight="600">
                {module.label}
              </text>
            </g>
          {/each}
        </g>
        
        <!-- Central hub indicator (appears when all modules are connected) -->
        {#if animationProgress > 0.9}
          <circle cx="300" cy="150" r="8" 
                  fill="var(--gradient-primary)" 
                  opacity={Math.max(0, (animationProgress - 0.9) * 10)}
                  class="central-hub">
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
          </circle>
        {/if}
      </svg>
    </div>
    
    <div class="architecture-text">
      <h2 class="architecture-headline">
        We design architectures that are clear to understand, simple to maintain, and ready to grow.
      </h2>
      
      <div class="architecture-principles">
        <div class="principle" style="opacity: {animationProgress > 0.3 ? 1 : 0}">
          <div class="principle-icon">🔍</div>
          <h3>Clear</h3>
          <p>Every component has a purpose, every connection makes sense.</p>
        </div>
        
        <div class="principle" style="opacity: {animationProgress > 0.6 ? 1 : 0}">
          <div class="principle-icon">⚙️</div>
          <h3>Simple</h3>
          <p>Elegant solutions that are easy to understand and maintain.</p>
        </div>
        
        <div class="principle" style="opacity: {animationProgress > 0.9 ? 1 : 0}">
          <div class="principle-icon">📈</div>
          <h3>Scalable</h3>
          <p>Built to grow with your business, from startup to enterprise.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .architecture-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%);
    padding: 4rem 2rem;
  }
  
  .architecture-content {
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  
  .architecture-visual {
    order: 1;
  }
  
  .architecture-text {
    order: 2;
  }
  
  .architecture-svg {
    width: 100%;
    height: auto;
  }
  
  .module-rect {
    transition: all 0.3s ease;
  }
  
  .module-text {
    pointer-events: none;
  }
  
  .central-hub {
    filter: drop-shadow(0 0 8px rgba(241, 23, 89, 0.6));
  }
  
  .architecture-headline {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600;
    line-height: 1.3;
    color: var(--text-primary);
    margin-bottom: 2rem;
  }
  
  .architecture-principles {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .principle {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: opacity 0.6s ease-out;
  }
  
  .principle-icon {
    font-size: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-primary);
    border-radius: 12px;
    flex-shrink: 0;
  }
  
  .principle h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
  }
  
  .principle p {
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 968px) {
    .architecture-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .architecture-visual {
      order: 2;
    }
    
    .architecture-text {
      order: 1;
      text-align: center;
    }
    
    .architecture-principles {
      align-items: center;
      text-align: left;
    }
  }
  
  @media (max-width: 768px) {
    .architecture-section {
      padding: 3rem 1rem;
    }
    
    .principle {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
    
    .principle-icon {
      margin-bottom: 0.5rem;
    }
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .central-hub animate {
      animation-duration: 0s;
    }
    
    .principle {
      transition: none;
      opacity: 1 !important;
    }
  }
</style>