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
            // Calculate animation progress based on scroll position
            const rect = entry.target.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / innerHeight));
            animationProgress = progress;
          }
        });
      }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
      
      if (sectionRef) observer.observe(sectionRef);
      
      return () => observer.disconnect();
    }
  });
  
  // Calculate parallax offset
  $: parallaxOffset = (scrollY - innerHeight) * 0.2;
</script>

<section 
  bind:this={sectionRef}
  class="bridge-section storyline-section" 
  style="transform: translateY({parallaxOffset}px)"
>
  <div class="bridge-content">
    <div class="bridge-text">
      <h2 class="bridge-headline">
        By turning ideas into actionable plans, we connect vision to delivery.
      </h2>
    </div>
    
    <div class="connections-visual">
      <svg viewBox="0 0 800 400" class="connections-svg">
        <defs>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#F11759;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#8333C5;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#D67D21;stop-opacity:1" />
          </linearGradient>
          
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#F11759;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#8333C5;stop-opacity:0.6" />
          </linearGradient>
        </defs>
        
        <!-- Connection lines -->
        <g class="connection-lines">
          <line x1="150" y1="150" x2="350" y2="100" 
                stroke="url(#lineGradient)" 
                stroke-width="2" 
                class="connection-line line-1"
                style="stroke-dasharray: 200; stroke-dashoffset: {200 - (animationProgress * 200)}" />
          
          <line x1="350" y1="100" x2="550" y2="180" 
                stroke="url(#lineGradient)" 
                stroke-width="2" 
                class="connection-line line-2"
                style="stroke-dasharray: 250; stroke-dashoffset: {250 - (animationProgress * 250)}" />
          
          <line x1="150" y1="250" x2="350" y2="300" 
                stroke="url(#lineGradient)" 
                stroke-width="2" 
                class="connection-line line-3"
                style="stroke-dasharray: 220; stroke-dashoffset: {220 - (animationProgress * 220)}" />
          
          <line x1="350" y1="300" x2="650" y2="150" 
                stroke="url(#lineGradient)" 
                stroke-width="2" 
                class="connection-line line-4"
                style="stroke-dasharray: 300; stroke-dashoffset: {300 - (animationProgress * 300)}" />
        </g>
        
        <!-- Nodes -->
        <g class="nodes">
          <!-- Vision node -->
          <circle cx="150" cy="150" r="15" fill="url(#nodeGradient)" class="node vision-node"
                  style="transform: scale({0.3 + (animationProgress * 0.7)}); transform-origin: 150px 150px" />
          <text x="150" y="190" text-anchor="middle" class="node-label" fill="var(--text-secondary)">Vision</text>
          
          <!-- Ideas node -->
          <circle cx="150" cy="250" r="12" fill="url(#nodeGradient)" class="node ideas-node"
                  style="transform: scale({0.3 + (animationProgress * 0.7)}); transform-origin: 150px 250px" />
          <text x="150" y="285" text-anchor="middle" class="node-label" fill="var(--text-secondary)">Ideas</text>
          
          <!-- Planning node -->
          <circle cx="350" cy="100" r="13" fill="url(#nodeGradient)" class="node planning-node"
                  style="transform: scale({0.3 + (animationProgress * 0.7)}); transform-origin: 350px 100px" />
          <text x="350" y="135" text-anchor="middle" class="node-label" fill="var(--text-secondary)">Planning</text>
          
          <!-- Architecture node -->
          <circle cx="350" cy="300" r="14" fill="url(#nodeGradient)" class="node architecture-node"
                  style="transform: scale({0.3 + (animationProgress * 0.7)}); transform-origin: 350px 300px" />
          <text x="350" y="335" text-anchor="middle" class="node-label" fill="var(--text-secondary)">Architecture</text>
          
          <!-- Implementation node -->
          <circle cx="550" cy="180" r="13" fill="url(#nodeGradient)" class="node implementation-node"
                  style="transform: scale({0.3 + (animationProgress * 0.7)}); transform-origin: 550px 180px" />
          <text x="550" y="215" text-anchor="middle" class="node-label" fill="var(--text-secondary)">Implementation</text>
          
          <!-- Delivery node -->
          <circle cx="650" cy="150" r="16" fill="url(#nodeGradient)" class="node delivery-node"
                  style="transform: scale({0.3 + (animationProgress * 0.7)}); transform-origin: 650px 150px" />
          <text x="650" y="185" text-anchor="middle" class="node-label" fill="var(--text-secondary)">Delivery</text>
        </g>
        
        <!-- Animated particles along connections -->
        {#if animationProgress > 0.7}
          <g class="particles">
            <circle r="3" fill="#F11759" class="particle particle-1">
              <animateMotion dur="3s" repeatCount="indefinite">
                <path d="M150,150 L350,100 L550,180 L650,150" />
              </animateMotion>
            </circle>
            
            <circle r="2" fill="#8333C5" class="particle particle-2">
              <animateMotion dur="4s" repeatCount="indefinite">
                <path d="M150,250 L350,300 L650,150" />
              </animateMotion>
            </circle>
          </g>
        {/if}
      </svg>
    </div>
  </div>
</section>

<style>
  .bridge-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
    padding: 4rem 2rem;
  }
  
  .bridge-content {
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  
  .bridge-text {
    order: 1;
  }
  
  .bridge-headline {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600;
    line-height: 1.3;
    color: var(--text-primary);
    margin: 0;
  }
  
  .connections-visual {
    order: 2;
  }
  
  .connections-svg {
    width: 100%;
    height: auto;
    max-width: 500px;
  }
  
  .connection-line {
    transition: all 0.8s ease-out;
  }
  
  .node {
    transition: all 0.6s ease-out;
    filter: drop-shadow(0 2px 8px rgba(241, 23, 89, 0.3));
  }
  
  .node-label {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.8;
  }
  
  .particle {
    opacity: 0.8;
    filter: drop-shadow(0 0 4px currentColor);
  }
  
  /* Mobile responsiveness */
  @media (max-width: 968px) {
    .bridge-content {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }
    
    .bridge-text {
      order: 1;
    }
    
    .connections-visual {
      order: 2;
    }
  }
  
  @media (max-width: 768px) {
    .bridge-section {
      padding: 3rem 1rem;
    }
    
    .connections-svg {
      max-width: 100%;
      height: 300px;
    }
    
    .node-label {
      font-size: 12px;
    }
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .connection-line,
    .node {
      transition: none;
    }
    
    .particle animateMotion {
      animation-duration: 0s;
    }
  }
</style>