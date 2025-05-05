<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  // PUBLIC_INTERFACE
  /** Enable/disable smooth scrolling */
  export let enabled = true;
  /** Scroll speed (lower = smoother, higher = faster) */
  export let speed = 0.8;
  /** Custom easing function */
  export let ease = 'power2.out';

  let containerElement: HTMLElement;
  let contentElement: HTMLElement;
  let smoothScrollAnimation: gsap.core.Tween;
  let rafId: number;
  let isScrolling = false;

  function setupSmoothScroll() {
    if (!enabled || !containerElement) return;

    const { scrollTop } = containerElement;
    const targetScrollTop = scrollTop;

    // Add velocity-based easing
    const currentVelocity = (targetScrollTop - (lastScrollTop || targetScrollTop)) / 16;
    lastScrollTop = targetScrollTop;

    if (!isScrolling) {
      isScrolling = true;
      smoothScrollAnimation = gsap.to(containerElement, {
        scrollTop: targetScrollTop,
        duration: speed,
        ease: ease,
        overwrite: true,
        onUpdate: () => {
          // Emit scroll progress for other components
          containerElement.dispatchEvent(new CustomEvent('smoothScroll', {
            detail: { progress: containerElement.scrollTop / (containerElement.scrollHeight - containerElement.clientHeight) }
          }));
        },
        onComplete: () => {
          isScrolling = false;
        }
      });
    } else {
      smoothScrollAnimation.vars.scrollTop = targetScrollTop;
    }

    // Use requestAnimationFrame for smoother updates
    rafId = requestAnimationFrame(setupSmoothScroll);
  }

  let lastScrollTop: number;

  onMount(() => {
    if (enabled) {
      containerElement.style.height = '100vh';
      containerElement.style.overflowY = 'scroll';
      contentElement.style.willChange = 'transform';

      // Initialize smooth scrolling
      rafId = requestAnimationFrame(setupSmoothScroll);

      // Refresh ScrollTrigger when content changes
      ScrollTrigger.refresh();
    }
  });

  onDestroy(() => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    if (smoothScrollAnimation) {
      smoothScrollAnimation.kill();
    }
  });
</script>

<div
  bind:this={containerElement}
  class="smooth-scroll-container"
  style:position="relative"
  style:overflow-x="hidden"
>
  <div
    bind:this={contentElement}
    class="smooth-scroll-content"
  >
    <slot />
  </div>
</div>

<style>
  .smooth-scroll-container {
    -webkit-overflow-scrolling: touch;
  }

  .smooth-scroll-content {
    position: relative;
    min-height: 100%;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .smooth-scroll-container::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .smooth-scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
