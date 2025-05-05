<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let timelineContainer: HTMLElement;

  const experiences = [
    {
      id: '2023',
      year: '2023',
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovators Inc.',
      description: 'Leading development of cloud-native applications',
      technologies: ['React', 'Node.js', 'AWS', 'Kubernetes']
    },
    {
      id: '2021',
      year: '2021',
      title: 'Full Stack Developer',
      company: 'Digital Solutions Co.',
      description: 'Built scalable web applications and microservices',
      technologies: ['Vue.js', 'Python', 'Docker', 'MongoDB']
    },
    {
      id: '2019',
      year: '2019',
      title: 'Frontend Developer',
      company: 'Creative Web Agency',
      description: 'Developed responsive and interactive web interfaces',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'jQuery']
    }
  ];

  onMount(() => {
    gsap.from(timelineContainer.children, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power4.out'
    });
  });
</script>

<div class="section">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl md:text-5xl font-bold mb-8">
      <span class="text-geek-accent">&lt;</span>
      About Me
      <span class="text-geek-accent">/&gt;</span>
    </h1>

    <div class="bg-black/40 backdrop-blur-sm rounded-lg border border-geek-secondary/20 p-6 mb-12">
      <div class="markdown">
        <p class="text-lg mb-4">
          Hello! I'm a passionate full-stack developer with a love for creating innovative web solutions. 
          My journey in tech has been driven by curiosity and a constant desire to learn and evolve.
        </p>
        <p class="text-geek-text/80">
          I specialize in building modern web applications using cutting-edge technologies and best practices. 
          When I'm not coding, you can find me contributing to open-source projects or exploring new tech trends.
        </p>
      </div>
    </div>

    <!-- Tech Timeline -->
    <div class="relative">
      <!-- Timeline line -->
      <div class="absolute left-0 md:left-1/2 h-full w-0.5 bg-geek-secondary/30 transform -translate-x-1/2"></div>

      <!-- Timeline entries -->
      <div 
        bind:this={timelineContainer}
        class="space-y-12"
      >
        {#each experiences as exp (exp.id)}
          <div class="relative flex flex-col md:flex-row items-center md:justify-between">
            <!-- Timeline dot -->
            <div class="absolute left-0 md:left-1/2 w-4 h-4 bg-geek-secondary rounded-full transform -translate-x-1/2"></div>
            
            <!-- Year -->
            <div class="mb-4 md:mb-0 md:w-5/12 text-right">
              <div class="bg-black/30 inline-block px-4 py-2 rounded border border-geek-secondary/20">
                <span class="text-geek-secondary font-code">{exp.year}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="md:w-5/12 bg-black/30 p-6 rounded-lg border border-geek-secondary/20">
              <h3 class="text-xl font-bold mb-2">{exp.title}</h3>
              <div class="text-geek-accent mb-2">{exp.company}</div>
              <p class="text-geek-text/80 mb-4">{exp.description}</p>
              <div class="flex flex-wrap gap-2">
                {#each exp.technologies as tech (tech)}
                  <span class="px-2 py-1 bg-geek-secondary/10 rounded text-geek-secondary text-sm">
                    {tech}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
