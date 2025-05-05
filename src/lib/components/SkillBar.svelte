<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  // PUBLIC_INTERFACE
  export interface Skill {
    /** Name of the skill */
    name: string;
    /** Proficiency level (0-100) */
    level: number;
    /** Custom color for the skill bar */
    color?: string;
  }

  // PUBLIC_INTERFACE
  export let skill: Skill;
  /** Whether to animate on mount */
  export let animate = true;

  let barElement: HTMLElement;
  let levelElement: HTMLElement;

  onMount(() => {
    if (animate) {
      // Create a more robust animation timeline
      const animation = gsap.timeline({
        paused: true,
        defaults: {
          duration: 1.2,
          ease: "power3.out"
        }
      });

      // Initial state
      gsap.set(barElement, { width: "0%" });
      gsap.set(levelElement, { opacity: 0 });

      // Build animation sequence
      animation
        .to(barElement, {
          width: `${skill.level}%`,
          duration: 1.2,
          ease: "power3.out"
        })
        .to(levelElement, {
          opacity: 1,
          duration: 0.3
        }, "-=0.8")
        .fromTo(levelElement,
          { textContent: "0" },
          {
            textContent: skill.level,
            duration: 1,
            snap: { textContent: 1 },
            modifiers: {
              textContent: value => Math.round(value) + "%"
            }
          },
          "-=0.8"
        );

      // Create scroll trigger with improved configuration
      const trigger = ScrollTrigger.create({
        trigger: barElement,
        start: "top bottom-=100",
        end: "bottom center",
        toggleActions: "play reverse play reverse",
        animation: animation,
        once: false,
        markers: false
      });

      // Cleanup function
      return () => {
        trigger.kill();
        animation.kill();
      };
    }
  });

  // Calculate level indicators (0-5 scale)
  $: indicators = Array.from({ length: 5 }, (_, index) =>
    skill.level >= (index + 1) * 20
  );
</script>

<div class="space-y-2">
  <div class="flex justify-between items-center mb-1">
    <div class="font-code text-geek-text">{skill.name}</div>
    <div
      bind:this={levelElement}
      class="font-code text-geek-secondary"
      aria-label={`${skill.level}% proficiency in ${skill.name}`}
    >
      {skill.level}%
    </div>
  </div>

  <div
    class="h-4 bg-black/30 rounded-full overflow-hidden border border-geek-secondary/20"
    role="progressbar"
    aria-valuenow={skill.level}
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      bind:this={barElement}
      class="h-full rounded-full transition-all duration-300"
      style="width: {animate ? '0' : skill.level}%; background-color: {skill.color || '#2ecc71'}; box-shadow: 0 0 10px {skill.color || '#2ecc71'}40"
    ></div>
  </div>

  <!-- RPG-style level indicators -->
  <div class="flex justify-between" aria-hidden="true">
    {#each indicators as isActive, i (i)}
      <div
        class="w-1 h-1 rounded-full transition-colors duration-300"
        class:bg-geek-secondary={isActive}
        class:bg-geek-secondary/20={!isActive}
      ></div>
    {/each}
  </div>
</div>
