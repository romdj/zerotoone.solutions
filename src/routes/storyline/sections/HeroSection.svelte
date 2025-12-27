<script>
  export let scrollY = 0;
  
  // Calculate parallax offset
  $: parallaxOffset = scrollY * 0.3;
  
  // Debug scroll position
  $: if (typeof window !== 'undefined') {
    console.log('Hero scrollY:', scrollY, 'parallaxOffset:', parallaxOffset);
  }
</script>

<section class="hero-section storyline-section" style="transform: translateY({parallaxOffset}px)">
  <div class="wave-background">
    <svg viewBox="0 0 1200 400" class="hero-wave">
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgba(241,23,89,0.1);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(131,51,197,0.1);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(214,125,33,0.1);stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z" fill="url(#waveGradient)" class="wave-path">
        <animate attributeName="d" 
                 values="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z;
                         M0,180 Q300,120 600,180 T1200,180 L1200,400 L0,400 Z;
                         M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z"
                 dur="8s" 
                 repeatCount="indefinite" />
      </path>
    </svg>
  </div>
  
  <div class="hero-content">
    <div class="hero-text">
      <h1 class="hero-headline">Simplicity at Scale</h1>
      <p class="hero-tagline">Complex challenges deserve elegant solutions.</p>
    </div>
    
    <div class="hero-actions">
      <a href="/contact" class="cta-primary">Work with Us</a>
      <button class="cta-secondary" on:click={() => {
        document.querySelector('.bridge-section')?.scrollIntoView({ behavior: 'smooth' });
      }}>
        See How We Work
      </button>
    </div>
  </div>
  
  <!-- Floating elements for depth -->
  <div class="floating-elements">
    <div class="float-element float-1"></div>
    <div class="float-element float-2"></div>
    <div class="float-element float-3"></div>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    overflow: hidden;
  }
  
  .wave-background {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 400px;
    z-index: 1;
  }
  
  .hero-wave {
    width: 100%;
    height: 100%;
  }
  
  .wave-path {
    opacity: 0.6;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    padding: 0 2rem;
  }
  
  .hero-text {
    margin-bottom: 3rem;
  }
  
  .hero-headline {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeInUp 1s ease-out;
  }
  
  .hero-tagline {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    color: var(--text-secondary);
    font-weight: 500;
    line-height: 1.4;
    animation: fadeInUp 1s ease-out 0.2s both;
  }
  
  .hero-actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeInUp 1s ease-out 0.4s both;
  }
  
  .cta-primary {
    padding: 1rem 2.5rem;
    background: var(--gradient-primary);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(241, 23, 89, 0.3);
  }
  
  .cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(241, 23, 89, 0.4);
  }
  
  .cta-secondary {
    padding: 1rem 2.5rem;
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--border-medium);
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .cta-secondary:hover {
    background: var(--hover-bg);
    border-color: var(--border-dark);
    transform: translateY(-2px);
  }
  
  .floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
  }
  
  .float-element {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: var(--gradient-primary);
    opacity: 0.05;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  
  .float-1 {
    top: 20%;
    left: 10%;
    animation: float1 12s infinite;
  }
  
  .float-2 {
    top: 60%;
    right: 15%;
    width: 150px;
    height: 150px;
    animation: float2 15s infinite;
  }
  
  .float-3 {
    bottom: 30%;
    left: 20%;
    width: 80px;
    height: 80px;
    animation: float3 10s infinite;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(30px, -20px) rotate(90deg); }
    50% { transform: translate(-20px, -40px) rotate(180deg); }
    75% { transform: translate(-30px, 20px) rotate(270deg); }
  }
  
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(-40px, 30px) rotate(120deg); }
    66% { transform: translate(20px, -25px) rotate(240deg); }
  }
  
  @keyframes float3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(25px, -35px) rotate(180deg); }
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .hero-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .cta-primary,
    .cta-secondary {
      width: 100%;
      max-width: 280px;
    }
    
    .floating-elements {
      display: none; /* Hide floating elements on mobile for performance */
    }
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .hero-headline,
    .hero-tagline,
    .hero-actions {
      animation: none;
    }
    
    .float-element {
      animation: none;
    }
    
    .wave-path animate {
      animation-duration: 0s;
    }
  }
</style>