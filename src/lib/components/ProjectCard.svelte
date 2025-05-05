<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  // PUBLIC_INTERFACE
  export interface Project {
    /** Project title */
    title: string;
    /** Project description */
    description: string;
    /** URL to project image */
    imageUrl: string;
    /** List of technologies used */
    techStack: string[];
    /** URL to GitHub repository */
    githubUrl?: string;
    /** URL to live demo */
    demoUrl?: string;
  }

  // PUBLIC_INTERFACE
  export let project: Project;

  let cardElement: HTMLElement;

  onMount(() => {
    // Set up hover animations
    const tl = gsap.timeline({ paused: true });
    tl.to(cardElement, {
      y: -10,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });

    cardElement.addEventListener('mouseenter', () => tl.play());
    cardElement.addEventListener('mouseleave', () => tl.reverse());
  });
</script>

<div
  bind:this={cardElement}
  class="bg-black/40 backdrop-blur-sm rounded-lg border border-geek-secondary/20 overflow-hidden transition-colors duration-300 hover:border-geek-secondary/50"
  role="article"
>
  {#if project.imageUrl}
    <div class="relative aspect-video overflow-hidden">
      <img
        src={project.imageUrl}
        alt={`Preview of ${project.title}`}
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  {/if}

  <div class="p-6">
    <h3 class="text-xl font-bold mb-2">
      <span class="text-geek-accent">&gt;</span> {project.title}
    </h3>

    <p class="text-geek-text/80 mb-4">{project.description}</p>

    <div class="flex flex-wrap gap-2 mb-4" aria-label="Technologies used">
      {#each project.techStack as tech (tech)}
        <span class="px-2 py-1 bg-geek-secondary/10 rounded text-geek-secondary text-sm font-code">
          {tech}
        </span>
      {/each}
    </div>

    <div class="flex gap-4">
      {#if project.githubUrl}
        <a
          href={project.githubUrl}
          class="btn bg-black/30 text-geek-secondary border border-geek-secondary/30 hover:bg-geek-secondary/10"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="text-geek-accent mr-2">&gt;</span> Code
        </a>
      {/if}

      {#if project.demoUrl}
        <a
          href={project.demoUrl}
          class="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="text-geek-primary mr-2">&gt;</span> Demo
        </a>
      {/if}
    </div>
  </div>
</div>
