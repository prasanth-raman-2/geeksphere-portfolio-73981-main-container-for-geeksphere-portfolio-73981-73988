<script lang="ts">
  import '../app.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { isPageTransitioning, completeInitialLoad } from '$lib/stores/animation';
  import { createMatrixTransition, createGlitchEffect, createScanLineEffect, createScrollReveal } from '$lib/transitions';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { SmoothScroll } from '$lib/components';

  let mainContent: HTMLElement;
  let layoutContainer: HTMLElement;
  let currentTransition: gsap.core.Timeline | null = null;

  // Matrix effect configuration
  const matrixConfig = {
    color: '#2ecc71',
    duration: 1.2,
    columns: 50,
    rows: 30
  };

  // Handle page transitions
  $: if ($isPageTransitioning) {
    if (currentTransition) {
      currentTransition.kill();
    }
    
    currentTransition = createMatrixTransition({
      container: layoutContainer,
      ...matrixConfig
    });

    // Animate main content
    gsap.to(mainContent, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(mainContent, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  }

  // Create optimized cyberpunk grid background with reduced cell count for better performance
  const gridCells = Array.from({ length: 64 }, (_, index) => ({
    id: `cell-${index}`,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 1.5
  }));

  // Set up context for GSAP animations
  gsap.config({
    autoSleep: 60,
    force3D: true,
    nullTargetWarn: false
  });

  onMount(() => {
    // Initial page load animation
    gsap.from(mainContent, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: completeInitialLoad
    });

    // Apply glitch effect to the logo
    const logo = document.querySelector('.site-logo');
    if (logo) {
      createGlitchEffect({
        element: logo as HTMLElement,
        duration: 0.2,
        intensity: 0.3
      });
    }

    // Apply scan line effect to section headings
    document.querySelectorAll('h1, h2').forEach(heading => {
      createScanLineEffect(heading as HTMLElement);
    });

    // Set up scroll reveal animations for sections
    document.querySelectorAll('.section').forEach(section => {
      createScrollReveal(section as HTMLElement, {
        y: 30,
        duration: 1,
        ease: 'power3.out'
      });
    });
  });

  onDestroy(() => {
    if (currentTransition) {
      currentTransition.kill();
    }
  });
</script>

<div 
  bind:this={layoutContainer}
  class="flex flex-col min-h-screen relative overflow-hidden"
>
  <Navigation />
  
  <SmoothScroll>
    <main 
      bind:this={mainContent}
      class="flex-1 mt-16 relative"
    >
      <!-- Tech-inspired background pattern -->
      <div class="fixed inset-0 z-0 pointer-events-none opacity-5">
        <div class="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] grid-rows-[repeat(auto-fill,minmax(50px,1fr))]">
          {#each gridCells as cell (cell.id)}
            <div 
              class="border border-geek-secondary/30"
              style={`animation: pulse ${cell.duration}s infinite ${cell.delay}s`}
            ></div>
          {/each}
        </div>
      </div>

      <!-- Matrix rain overlay (active during transitions) -->
      <div class="matrix-overlay fixed inset-0 pointer-events-none opacity-0">
        <canvas id="matrix-canvas"></canvas>
      </div>

      <!-- Main content -->
      <div class="relative z-10">
        <slot />
      </div>
    </main>

    <footer class="relative z-10 bg-geek-primary/80 backdrop-blur-sm border-t border-geek-secondary/20 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Brand section -->
          <div>
            <h3 class="site-logo text-xl font-display font-bold mb-4">&lt;GeekSphere/&gt;</h3>
            <p class="text-geek-text/80 font-code text-sm">
              Crafting digital experiences with a geeky touch
            </p>
          </div>

          <!-- Quick links -->
          <div>
            <h4 class="text-lg font-display font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 font-code text-sm">
              <li><a href="/projects" class="nav-link">&gt; Projects</a></li>
              <li><a href="/blog" class="nav-link">&gt; Blog</a></li>
              <li><a href="/contact" class="nav-link">&gt; Contact</a></li>
            </ul>
          </div>

          <!-- Social links -->
          <div>
            <h4 class="text-lg font-display font-semibold mb-4">Connect</h4>
            <ul class="space-y-2 font-code text-sm">
              <li><a href="https://github.com" target="_blank" rel="noopener" class="nav-link">&gt; GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener" class="nav-link">&gt; Twitter</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener" class="nav-link">&gt; LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-geek-secondary/20 text-center font-code text-sm text-geek-text/60">
          <p>&copy; {new Date().getFullYear()} GeekSphere. All rights reserved.</p>
        </div>
      </div>

      <!-- Binary pattern decoration -->
      <div class="absolute top-0 left-0 w-full h-0.5 overflow-hidden opacity-20 rotate-180">
        <div class="binary-pattern"></div>
      </div>
    </footer>
  </SmoothScroll>
</div>

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

  @keyframes pulse {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.3; }
  }

  :global(:root) {
    --geek-secondary: #2ecc71;
  }

  /* Matrix overlay styles */
  .matrix-overlay {
    transition: opacity 0.3s ease;
  }
  .matrix-overlay.active {
    opacity: 0.15;
  }

  /* Add glitch effect styles */
  @keyframes glitch {
    0% {
      clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
      transform: translate(-2px);
    }
    2% {
      clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
      transform: translate(2px);
    }
    4% {
      clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
      transform: translate(-1px);
    }
    6% {
      clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
      transform: translate(1px);
    }
    8% {
      clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
      transform: translate(2px);
    }
    10% {
      clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
      transform: translate(1px);
    }
    12% {
      clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
      transform: translate(-1px);
    }
    14% {
      clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
      transform: translate(2px);
    }
    16% {
      clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
      transform: translate(-1px);
    }
    18% {
      clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
      transform: translate(1px);
    }
    20% {
      clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
      transform: translate(-2px);
    }
    100% {
      transform: translate(0);
    }
  }
</style>
