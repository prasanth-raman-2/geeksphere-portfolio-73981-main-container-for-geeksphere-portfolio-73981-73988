<script lang="ts">
  import '../app.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { isPageTransitioning, completeInitialLoad } from '$lib/stores/animation';

  let mainContent: HTMLElement;
  
  onMount(() => {
    // Animate main content on mount
    gsap.from(mainContent, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        completeInitialLoad();
      }
    });
  });

  const gridCells = Array.from({ length: 100 }, (_, index) => ({
    id: `cell-${index}`,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }));

  $: if ($isPageTransitioning) {
    gsap.to(mainContent, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in'
    }).then(() => {
      gsap.to(mainContent, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  }
</script>

<div class="flex flex-col min-h-screen">
  <Navigation />
  
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
            style={`animation: pulse ${cell.duration}s infinite ${cell.delay}s`}></div>
        {/each}
      </div>
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
          <h3 class="text-xl font-display font-bold mb-4">&lt;GeekSphere/&gt;</h3>
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
</style>
