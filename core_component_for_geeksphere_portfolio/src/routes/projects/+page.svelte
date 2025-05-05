<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let projectsContainer: HTMLElement;

  const projects = [
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A full-stack web application with real-time features',
      techStack: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
      image: 'https://picsum.photos/seed/1/400/300',
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: 'Project Beta',
      description: 'Mobile-first e-commerce platform with AI recommendations',
      techStack: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL'],
      image: 'https://picsum.photos/seed/2/400/300',
      github: '#',
      demo: '#'
    },
    {
      id: 3,
      title: 'Project Gamma',
      description: 'Cross-platform desktop application for productivity',
      techStack: ['Electron', 'React', 'TypeScript', 'SQLite'],
      image: 'https://picsum.photos/seed/3/400/300',
      github: '#',
      demo: '#'
    }
  ];

  onMount(() => {
    gsap.from(projectsContainer.children, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power4.out'
    });
  });
</script>

<div class="section">
  <div class="max-w-7xl mx-auto">
    <h1 class="text-4xl md:text-5xl font-bold mb-8">
      <span class="text-geek-accent">&lt;</span>
      Projects
      <span class="text-geek-accent">/&gt;</span>
    </h1>
    
    <div 
      bind:this={projectsContainer}
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {#each projects as project (project.id)}
        <div class="bg-black/40 backdrop-blur-sm rounded-lg border border-geek-secondary/20 overflow-hidden hover:border-geek-secondary/50 transition-all duration-300 shadow-lg hover:shadow-geek-secondary/10">
          <img 
            src={project.image} 
            alt={project.title}
            class="w-full h-48 object-cover"
          />
          
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">{project.title}</h3>
            <p class="text-geek-text/80 mb-4">{project.description}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.techStack as tech (tech)}
                <span class="px-2 py-1 bg-geek-secondary/10 rounded text-geek-secondary text-sm">
                  {tech}
                </span>
              {/each}
            </div>
            
            <div class="flex gap-4">
              <a 
                href={project.github}
                class="btn bg-black/30 text-geek-secondary border border-geek-secondary/30 hover:bg-geek-secondary/10"
              >
                <span class="text-geek-accent mr-2">&gt;</span> Code
              </a>
              <a 
                href={project.demo}
                class="btn btn-primary"
              >
                <span class="text-geek-primary mr-2">&gt;</span> Demo
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
