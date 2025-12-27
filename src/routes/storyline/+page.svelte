<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  import HeroSection from './sections/HeroSection.svelte';
  import BridgeSection from './sections/BridgeSection.svelte';
  import ArchitectureSection from './sections/ArchitectureSection.svelte';
  import ScaleSection from './sections/ScaleSection.svelte';
  import FinalCTASection from './sections/FinalCTASection.svelte';
  
  let scrollY = 0;
  let innerHeight = 0;
  
  onMount(() => {
    if (browser) {
      // Initialize scroll-triggered animations
      const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);
      
      // Observe all sections
      document.querySelectorAll('.storyline-section').forEach(section => {
        observer.observe(section);
      });
      
      return () => observer.disconnect();
    }
  });
</script>

<svelte:window bind:scrollY bind:innerHeight />

<svelte:head>
  <title>Simplicity at Scale - Zero to One Solutions</title>
  <meta name="description" content="Discover how we turn complex challenges into elegant solutions through our unique approach to simplicity at scale." />
</svelte:head>

<main class="storyline-container">
  <HeroSection {scrollY} />
  <BridgeSection {scrollY} {innerHeight} />
  <ArchitectureSection {scrollY} {innerHeight} />
  <ScaleSection {scrollY} {innerHeight} />
  <FinalCTASection {scrollY} {innerHeight} />
</main>

<style>
  .storyline-container {
    width: 100%;
    overflow-x: hidden;
  }
  
  :global(.storyline-section) {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  :global(.storyline-section.animate-in) {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Smooth scrolling */
  :global(html) {
    scroll-behavior: smooth;
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    :global(.storyline-section) {
      transition: none;
      opacity: 1;
      transform: none;
    }
    
    :global(html) {
      scroll-behavior: auto;
    }
  }
</style>