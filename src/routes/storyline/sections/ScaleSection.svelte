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
  $: parallaxOffset = (scrollY - (innerHeight * 2.5)) * 0.1;
  
  // Growth stages data
  $: growthStages = [
    { 
      label: 'Idea', 
      size: 20, 
      delay: 0, 
      description: 'Initial concept',
      color: '#F11759'
    },
    { 
      label: 'MVP', 
      size: 35, 
      delay: 0.2, 
      description: 'Minimum viable product',
      color: '#E91E8C'
    },
    { 
      label: 'Scale', 
      size: 55, 
      delay: 0.4, 
      description: 'Growing user base',
      color: '#B333A5'
    },
    { 
      label: 'Enterprise', 
      size: 80, 
      delay: 0.6, 
      description: 'Enterprise-ready',
      color: '#8333C5'
    },
    { 
      label: 'Global', 
      size: 100, 
      delay: 0.8, 
      description: 'Worldwide reach',
      color: '#D67D21'
    }
  ];
  
  function getStageSize(stage: any, progress: number) {
    const adjustedProgress = Math.max(0, Math.min(1, (progress - stage.delay) / 0.6));
    const easeProgress = 1 - Math.pow(1 - adjustedProgress, 2); // Ease out quad
    return stage.size * easeProgress;
  }
  
  function getStageOpacity(stage: any, progress: number) {
    const adjustedProgress = Math.max(0, Math.min(1, (progress - stage.delay) / 0.4));
    return adjustedProgress;
  }
</script>

<section 
  bind:this={sectionRef}
  class="scale-section storyline-section" 
  style="transform: translateY({parallaxOffset}px)"
>
  <!-- Background color transition -->
  <div 
    class="background-overlay" 
    style="opacity: {Math.min(1, animationProgress * 1.5)}"
  ></div>
  
  <div class="scale-content">
    <div class="scale-text">
      <h2 class="scale-headline">
        Scaling with confidence — from first idea to enterprise-ready systems.
      </h2>
      
      <div class="scale-benefits">
        <div class="benefit" style="opacity: {animationProgress > 0.3 ? 1 : 0}">
          <span class="benefit-icon">🚀</span>
          <span>Start small, think big</span>
        </div>
        
        <div class="benefit" style="opacity: {animationProgress > 0.5 ? 1 : 0}">
          <span class="benefit-icon">⚡</span>
          <span>Rapid iteration cycles</span>
        </div>
        
        <div class="benefit" style="opacity: {animationProgress > 0.7 ? 1 : 0}">
          <span class="benefit-icon">🌍</span>
          <span>Global scale architecture</span>
        </div>
      </div>
    </div>
    
    <div class="growth-visual">
      <svg viewBox="0 0 600 400" class="growth-svg">
        <defs>
          <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#F11759;stop-opacity:0.8" />
            <stop offset="70%" style="stop-color:#8333C5;stop-opacity:0.4" />
            <stop offset="100%" style="stop-color:#D67D21;stop-opacity:0.1" />
          </radialGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Growth circles representing scaling stages -->
        <g class="growth-stages">
          {#each growthStages as stage, index}
            {@const size = getStageSize(stage, animationProgress)}
            {@const opacity = getStageOpacity(stage, animationProgress)}
            
            <!-- Background ring -->
            <circle cx="300" cy="200" 
                    r={stage.size} 
                    fill="none" 
                    stroke={stage.color}
                    stroke-width="2" 
                    stroke-dasharray="5,5"
                    opacity="0.3"
                    style="transform-origin: 300px 200px; transform: scale({Math.min(1, animationProgress * 2)})" />
            
            <!-- Animated growth circle -->
            <circle cx="300" cy="200" 
                    r={size} 
                    fill={stage.color}
                    opacity={opacity * 0.2}
                    filter="url(#glow)"
                    class="growth-circle">
              {#if animationProgress > stage.delay + 0.4}
                <animate attributeName="r" 
                         values="{size};{size + 5};{size}" 
                         dur="3s" 
                         repeatCount="indefinite" />
              {/if}
            </circle>
            
            <!-- Stage label -->
            {#if opacity > 0.5}
              <text x={300 + (stage.size * 0.7) * Math.cos((index * 72 - 90) * Math.PI / 180)} 
                    y={200 + (stage.size * 0.7) * Math.sin((index * 72 - 90) * Math.PI / 180)} 
                    text-anchor="middle" 
                    class="stage-label" 
                    fill={stage.color}
                    opacity={opacity}>
                <tspan x={300 + (stage.size * 0.7) * Math.cos((index * 72 - 90) * Math.PI / 180)} dy="0" font-weight="600">{stage.label}</tspan>
                <tspan x={300 + (stage.size * 0.7) * Math.cos((index * 72 - 90) * Math.PI / 180)} dy="15" font-size="10" opacity="0.8">{stage.description}</tspan>
              </text>
            {/if}
          {/each}
        </g>
        
        <!-- Central core -->
        <circle cx="300" cy="200" r="15" 
                fill="url(#pulseGradient)" 
                opacity={animationProgress}
                class="central-core">
          {#if animationProgress > 0.8}
            <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
          {/if}
        </circle>
        
        <!-- Growth metrics indicators -->
        {#if animationProgress > 0.6}
          <g class="metrics" opacity={Math.max(0, (animationProgress - 0.6) * 2.5)}>
            <!-- Users metric -->
            <g transform="translate(450, 120)">
              <rect x="-30" y="-15" width="60" height="30" rx="15" fill="var(--card-bg)" stroke="var(--border-light)" />
              <text x="0" y="-2" text-anchor="middle" class="metric-value" fill="var(--text-primary)">10M+</text>
              <text x="0" y="10" text-anchor="middle" class="metric-label" fill="var(--text-secondary)">Users</text>
            </g>
            
            <!-- Requests metric -->
            <g transform="translate(150, 120)">
              <rect x="-35" y="-15" width="70" height="30" rx="15" fill="var(--card-bg)" stroke="var(--border-light)" />
              <text x="0" y="-2" text-anchor="middle" class="metric-value" fill="var(--text-primary)">1B+</text>
              <text x="0" y="10" text-anchor="middle" class="metric-label" fill="var(--text-secondary)">Requests</text>
            </g>
            
            <!-- Uptime metric -->
            <g transform="translate(300, 320)">
              <rect x="-30" y="-15" width="60" height="30" rx="15" fill="var(--card-bg)" stroke="var(--border-light)" />
              <text x="0" y="-2" text-anchor="middle" class="metric-value" fill="var(--text-primary)">99.9%</text>
              <text x="0" y="10" text-anchor="middle" class="metric-label" fill="var(--text-secondary)">Uptime</text>
            </g>
          </g>
        {/if}
      </svg>
    </div>
  </div>
</section>

<style>
  .scale-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    padding: 4rem 2rem;
    overflow: hidden;
  }
  
  .background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(241, 23, 89, 0.05) 0%, 
      rgba(131, 51, 197, 0.05) 50%, 
      rgba(214, 125, 33, 0.05) 100%);
    z-index: 1;
  }
  
  .scale-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  
  .scale-text {
    order: 2;
  }
  
  .growth-visual {
    order: 1;
  }
  
  .scale-headline {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600;
    line-height: 1.3;
    color: var(--text-primary);
    margin-bottom: 2rem;
  }
  
  .scale-benefits {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .benefit {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: var(--card-bg);
    border: 1px solid var(--border-light);
    border-radius: 12px;
    box-shadow: var(--card-shadow);
    transition: all 0.6s ease-out;
    font-weight: 500;
    color: var(--text-primary);
  }
  
  .benefit:hover {
    transform: translateX(8px);
    box-shadow: var(--card-hover-shadow);
  }
  
  .benefit-icon {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--gradient-primary);
    border-radius: 10px;
    flex-shrink: 0;
  }
  
  .growth-svg {
    width: 100%;
    height: auto;
  }
  
  .growth-circle {
    transition: all 0.8s ease-out;
  }
  
  .central-core {
    filter: drop-shadow(0 0 10px rgba(241, 23, 89, 0.4));
  }
  
  .stage-label {
    font-size: 12px;
    font-weight: 500;
  }
  
  .metric-value {
    font-size: 12px;
    font-weight: 600;
  }
  
  .metric-label {
    font-size: 10px;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 968px) {
    .scale-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .scale-text {
      order: 1;
      text-align: center;
    }
    
    .growth-visual {
      order: 2;
    }
  }
  
  @media (max-width: 768px) {
    .scale-section {
      padding: 3rem 1rem;
    }
    
    .growth-svg {
      height: 300px;
    }
    
    .benefit {
      flex-direction: column;
      text-align: center;
      padding: 1.5rem;
    }
    
    .benefit-icon {
      margin-bottom: 0.5rem;
    }
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .growth-circle animate,
    .central-core animate {
      animation-duration: 0s;
    }
    
    .benefit {
      transition: none;
      opacity: 1 !important;
    }
    
    .benefit:hover {
      transform: none;
    }
  }
</style>