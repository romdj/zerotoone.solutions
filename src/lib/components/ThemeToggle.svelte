<script lang="ts">
  import { theme } from '$lib/stores/theme';

  $: isDark = $theme === 'dark';
</script>

<button
  class="theme-toggle"
  on:click={theme.toggle}
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
  <div class="theme-toggle-inner">
    <div class="sun-icon" class:hidden={isDark}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
        <path d="m12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>
      </svg>
    </div>
    <div class="moon-icon" class:hidden={!isDark}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
      </svg>
    </div>
  </div>
</button>

<style>
  .theme-toggle {
    position: relative;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 12px;
    background: var(--theme-toggle-bg);
    color: var(--theme-toggle-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: var(--theme-toggle-shadow);
  }
  
  .theme-toggle:hover {
    background: var(--theme-toggle-bg-hover);
    transform: translateY(-1px);
    box-shadow: var(--theme-toggle-shadow-hover);
  }
  
  .theme-toggle:active {
    transform: translateY(0);
  }
  
  .theme-toggle-inner {
    position: relative;
    width: 20px;
    height: 20px;
  }
  
  .sun-icon,
  .moon-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .sun-icon:not(.hidden) {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  
  .sun-icon.hidden {
    opacity: 0;
    transform: rotate(180deg) scale(0.8);
  }
  
  .moon-icon:not(.hidden) {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  
  .moon-icon.hidden {
    opacity: 0;
    transform: rotate(-180deg) scale(0.8);
  }
  
  /* CSS Variables for theme toggle */
  :global([data-theme="light"]) .theme-toggle {
    --theme-toggle-bg: rgba(255, 255, 255, 0.9);
    --theme-toggle-bg-hover: rgba(255, 255, 255, 1);
    --theme-toggle-color: #333;
    --theme-toggle-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    --theme-toggle-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
  
  :global([data-theme="dark"]) .theme-toggle {
    --theme-toggle-bg: rgba(30, 30, 30, 0.9);
    --theme-toggle-bg-hover: rgba(45, 45, 45, 1);
    --theme-toggle-color: #fff;
    --theme-toggle-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    --theme-toggle-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
</style>