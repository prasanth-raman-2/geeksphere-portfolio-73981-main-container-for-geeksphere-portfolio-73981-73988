<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let skillsContainer: HTMLElement;

  const skillCategories = [
    {
      name: 'Frontend Development',
      skills: [
        { name: 'React/Next.js', level: 90, color: '#61dafb' },
        { name: 'Vue/Nuxt.js', level: 85, color: '#42b883' },
        { name: 'Svelte/SvelteKit', level: 80, color: '#ff3e00' },
        { name: 'TypeScript', level: 88, color: '#3178c6' }
      ]
    },
    {
      name: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 85, color: '#68a063' },
        { name: 'Python', level: 82, color: '#ffd43b' },
        { name: 'GraphQL', level: 78, color: '#e535ab' },
        { name: 'REST APIs', level: 92, color: '#38bdf8' }
      ]
    },
    {
      name: 'DevOps & Tools',
      skills: [
        { name: 'Docker', level: 75, color: '#2496ed' },
        { name: 'Git', level: 88, color: '#f14e32' },
        { name: 'AWS', level: 70, color: '#ff9900' },
        { name: 'Linux', level: 85, color: '#185886' }
      ]
    }
  ];

  onMount(() => {
    // Create a timeline for better control and cleanup
    const tl = gsap.timeline();

    // Animate skill bars on mount
    tl.from(skillsContainer.querySelectorAll('.skill-bar'), {
      width: 0,
      duration: 1.5,
      ease: 'power4.out',
      stagger: 0.1
    });

    // Animate skill numbers
    tl.from(skillsContainer.querySelectorAll('.skill-level'), {
      textContent: 0,
      duration: 1.5,
      ease: 'power4.out',
      stagger: 0.1,
      snap: { textContent: 1 },
      modifiers: {
        textContent: value => Math.round(value) + '%'
      }
    }, '<');

    // Return cleanup function
    return () => {
      tl.kill();
    };
  });

  function getLevelIndicatorClass(skillLevel: number, index: number): string {
    return `w-1 h-1 rounded-full ${skillLevel >= (index + 1) * 20 ? 'bg-geek-secondary' : 'bg-geek-secondary/20'}`;
  }

  // Create an array of indices for level indicators
  const levelIndices = [0, 1, 2, 3, 4];
</script>

<div class="section">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl md:text-5xl font-bold mb-8">
      <span class="text-geek-accent">&lt;</span>
      Skills
      <span class="text-geek-accent">/&gt;</span>
    </h1>

    <div 
      bind:this={skillsContainer}
      class="space-y-12"
    >
      {#each skillCategories as category (category.name)}
        <div class="bg-black/40 backdrop-blur-sm rounded-lg border border-geek-secondary/20 p-6">
          <h2 class="text-2xl font-bold mb-6">
            <span class="text-geek-accent">#</span> {category.name}
          </h2>

          <div class="space-y-6">
            {#each category.skills as skill (skill.name)}
              <div>
                <div class="flex justify-between mb-2">
                  <div class="font-code">{skill.name}</div>
                  <div class="font-code skill-level text-geek-secondary">
                    {skill.level}%
                  </div>
                </div>
                
                <div class="h-4 bg-black/30 rounded-full overflow-hidden border border-geek-secondary/20">
                  <div
                    class="skill-bar h-full rounded-full"
                    style="width: {skill.level}%; background-color: {skill.color}; box-shadow: 0 0 10px {skill.color}40"
                  ></div>
                </div>

                <!-- RPG-style level indicators -->
                <div class="flex justify-between mt-1">
                  {#each levelIndices as index (index)}
                    <div class={getLevelIndicatorClass(skill.level, index)}></div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
