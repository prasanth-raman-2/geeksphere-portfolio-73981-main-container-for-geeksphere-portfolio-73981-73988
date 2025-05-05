<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let navElement: HTMLElement;
  let isMobileMenuOpen = false;

  const navLinks = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/projects', label: 'Projects', id: 'projects' },
    { href: '/blog', label: 'Blog', id: 'blog' },
    { href: '/about', label: 'About', id: 'about' },
    { href: '/contact', label: 'Contact', id: 'contact' }
  ];

  // Add geeky animation on mount
  onMount(() => {
    gsap.from(navElement, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Toggle mobile menu
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<nav 
  bind:this={navElement}
  class="fixed top-0 left-0 right-0 z-50 bg-geek-primary/90 backdrop-blur-md border-b border-geek-secondary/20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <!-- Logo Area -->
      <div class="flex-shrink-0 flex items-center">
        <a href="/" class="text-geek-secondary font-display font-bold text-2xl">
          <span class="animate-glow">&lt;GeekSphere/&gt;</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex md:items-center md:space-x-8">
        {#each navLinks as {href, label, id} (id)}
          <a {href} class="nav-link font-code">
            <span class="text-geek-accent">&gt;</span> {label}
          </a>
        {/each}
      </div>

      <!-- Mobile menu button -->
      <div class="flex items-center md:hidden">
        <button 
          on:click={toggleMobileMenu}
          class="text-geek-text hover:text-geek-secondary"
          aria-label="Toggle menu">
          <div class="w-6 h-5 relative flex flex-col justify-between">
            <span class="w-full h-0.5 bg-current transition-transform duration-300" 
              style={isMobileMenuOpen ? 'transform: rotate(45deg) translate(5px, 5px)' : ''}></span>
            <span class="w-full h-0.5 bg-current transition-opacity duration-300"
              style={isMobileMenuOpen ? 'opacity: 0' : ''}></span>
            <span class="w-full h-0.5 bg-current transition-transform duration-300"
              style={isMobileMenuOpen ? 'transform: rotate(-45deg) translate(5px, -5px)' : ''}></span>
          </div>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Navigation Menu -->
  {#if isMobileMenuOpen}
    <div class="md:hidden bg-geek-primary/95 backdrop-blur-md border-t border-geek-secondary/20">
      <div class="px-2 pt-2 pb-3 space-y-1">
        {#each navLinks as {href, label, id} (id)}
          <a {href} 
            class="nav-link block px-3 py-2 text-base font-code"
            on:click={() => isMobileMenuOpen = false}>
            <span class="text-geek-accent">&gt;</span> {label}
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Binary pattern decoration -->
  <div class="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden opacity-20">
    <div class="binary-pattern"></div>
  </div>
</nav>

<style>
  .binary-pattern {
    background-image: repeating-linear-gradient(
      to right,
      var(--geek-secondary) 0,
      var(--geek-secondary) 1px,
      transparent 1px,
      transparent 8px
    );
    height: 100%;
    width: 200%;
    animation: slide 20s linear infinite;
  }

  @keyframes slide {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  :global(:root) {
    --geek-secondary: #2ecc71;
  }
</style>
