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
      }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
      
      if (sectionRef) observer.observe(sectionRef);
      
      return () => observer.disconnect();
    }
  });
  
  // Calculate parallax offset
  $: parallaxOffset = (scrollY - (innerHeight * 3.5)) * 0.1;
</script>

<section 
  bind:this={sectionRef}
  class="final-cta-section storyline-section" 
  style="transform: translateY({parallaxOffset}px)"
>
  <!-- Echoing wave background - different frequency from hero -->
  <div class="wave-background">
    <svg viewBox="0 0 1200 500" class="echo-wave">
      <defs>
        <linearGradient id="echoWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgba(214,125,33,0.15);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(131,51,197,0.15);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(241,23,89,0.15);stop-opacity:1" />
        </linearGradient>
        
        <linearGradient id="echoWaveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgba(214,125,33,0.08);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(131,51,197,0.08);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(241,23,89,0.08);stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Primary echo wave -->
      <path d="M0,250 Q200,150 400,250 T800,250 Q1000,200 1200,250 L1200,500 L0,500 Z" 
            fill="url(#echoWaveGradient)" 
            class="echo-wave-path primary-wave">
        <animate attributeName="d" 
                 values="M0,250 Q200,150 400,250 T800,250 Q1000,200 1200,250 L1200,500 L0,500 Z;
                         M0,230 Q200,170 400,230 T800,230 Q1000,180 1200,230 L1200,500 L0,500 Z;
                         M0,250 Q200,150 400,250 T800,250 Q1000,200 1200,250 L1200,500 L0,500 Z"
                 dur="10s" 
                 repeatCount="indefinite" />
      </path>
      
      <!-- Secondary echo wave -->
      <path d="M0,300 Q300,200 600,300 T1200,300 L1200,500 L0,500 Z" 
            fill="url(#echoWaveGradient2)" 
            class="echo-wave-path secondary-wave">
        <animate attributeName="d" 
                 values="M0,300 Q300,200 600,300 T1200,300 L1200,500 L0,500 Z;
                         M0,280 Q300,220 600,280 T1200,280 L1200,500 L0,500 Z;
                         M0,300 Q300,200 600,300 T1200,300 L1200,500 L0,500 Z"
                 dur="12s" 
                 repeatCount="indefinite" />
      </path>
    </svg>
  </div>
  
  <!-- Floating particles for depth -->
  <div class="particles-container">
    {#each Array(8) as _, i}
      <div 
        class="particle particle-{i}" 
        style="opacity: {animationProgress > 0.3 ? 0.6 : 0}"
      ></div>
    {/each}
  </div>
  
  <div class="final-cta-content">
    <div class="cta-text">
      <h2 class="cta-headline" style="opacity: {animationProgress > 0.2 ? 1 : 0}">
        Ready to simplify your complexity?
      </h2>
      
      <p class="cta-subtext" style="opacity: {animationProgress > 0.4 ? 1 : 0}">
        Let's transform your ambitious ideas into elegant, scalable solutions that grow with your vision.
      </p>
    </div>
    
    <div class="cta-actions" style="opacity: {animationProgress > 0.6 ? 1 : 0}">
      <a href="/contact" class="cta-primary-btn">
        <span class="btn-text">Start a Conversation</span>
        <span class="btn-icon">💬</span>
      </a>
      
      <a href="/portfolio" class="cta-secondary-btn">
        <span class="btn-text">Explore Case Studies</span>
        <span class="btn-icon">📚</span>
      </a>
    </div>
    
    <!-- Trust indicators -->
    <div class="trust-indicators" style="opacity: {animationProgress > 0.8 ? 1 : 0}">
      <div class="trust-item">
        <span class="trust-icon">⚡</span>
        <span class="trust-text">Fast delivery</span>
      </div>
      
      <div class="trust-item">
        <span class="trust-icon">🔒</span>
        <span class="trust-text">Enterprise secure</span>
      </div>
      
      <div class="trust-item">
        <span class="trust-icon">🌍</span>
        <span class="trust-text">Global scale</span>
      </div>
      
      <div class="trust-item">
        <span class="trust-icon">🤝</span>
        <span class="trust-text">Trusted partners</span>
      </div>
    </div>
  </div>
</section>

<style>
  .final-cta-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
    overflow: hidden;
    padding: 4rem 2rem;
  }
  
  .wave-background {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 500px;
    z-index: 1;
  }
  
  .echo-wave {
    width: 100%;
    height: 100%;
  }
  
  .echo-wave-path {
    opacity: 0.8;
  }
  
  .particles-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
  }
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: 50%;
    animation: float 15s ease-in-out infinite;
    transition: opacity 0.8s ease-out;
  }
  
  .particle-0 { top: 20%; left: 10%; animation-delay: 0s; }
  .particle-1 { top: 30%; right: 15%; animation-delay: 2s; }
  .particle-2 { top: 50%; left: 20%; animation-delay: 4s; }
  .particle-3 { top: 70%; right: 25%; animation-delay: 6s; }
  .particle-4 { top: 40%; left: 50%; animation-delay: 8s; }
  .particle-5 { top: 60%; right: 40%; animation-delay: 10s; }
  .particle-6 { top: 25%; left: 70%; animation-delay: 12s; }
  .particle-7 { top: 75%; right: 60%; animation-delay: 14s; }
  
  .final-cta-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    width: 100%;
  }
  
  .cta-text {
    margin-bottom: 3rem;
  }
  
  .cta-headline {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 700;
    line-height: 1.2;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    transition: opacity 0.8s ease-out;
  }
  
  .cta-subtext {
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 3rem;
    transition: opacity 0.8s ease-out 0.2s;
  }
  
  .cta-actions {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    transition: opacity 0.8s ease-out 0.4s;
  }
  
  .cta-primary-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 2.5rem;
    background: var(--gradient-primary);
    color: white;
    text-decoration: none;
    border-radius: 60px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 8px 30px rgba(241, 23, 89, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .cta-primary-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  
  .cta-primary-btn:hover::before {
    left: 100%;
  }
  
  .cta-primary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(241, 23, 89, 0.4);
  }
  
  .cta-secondary-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 2.5rem;
    background: var(--card-bg);
    color: var(--text-primary);
    text-decoration: none;
    border: 2px solid var(--border-medium);
    border-radius: 60px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: var(--card-shadow);
  }
  
  .cta-secondary-btn:hover {
    background: var(--hover-bg);
    border-color: var(--border-dark);
    transform: translateY(-3px);
    box-shadow: var(--card-hover-shadow);
  }
  
  .btn-icon {
    font-size: 1.2rem;
  }
  
  .trust-indicators {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    transition: opacity 0.8s ease-out 0.6s;
  }
  
  .trust-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--card-bg);
    border: 1px solid var(--border-light);
    border-radius: 25px;
    box-shadow: var(--card-shadow);
    transition: all 0.3s ease;
  }
  
  .trust-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--card-hover-shadow);
  }
  
  .trust-icon {
    font-size: 1.1rem;
  }
  
  .trust-text {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(-10px) translateX(-5px); }
    75% { transform: translateY(-25px) translateX(5px); }
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .final-cta-section {
      padding: 3rem 1rem;
    }
    
    .cta-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .cta-primary-btn,
    .cta-secondary-btn {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
    
    .trust-indicators {
      gap: 1rem;
    }
    
    .trust-item {
      flex-direction: column;
      text-align: center;
      padding: 1rem;
      min-width: 120px;
    }
    
    .particles-container {
      display: none; /* Hide particles on mobile for performance */
    }
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .cta-headline,
    .cta-subtext,
    .cta-actions,
    .trust-indicators,
    .particle {
      transition: none;
      opacity: 1 !important;
    }
    
    .particle {
      animation: none;
    }
    
    .echo-wave-path animate {
      animation-duration: 0s;
    }
    
    .cta-primary-btn::before {
      display: none;
    }
  }
</style>