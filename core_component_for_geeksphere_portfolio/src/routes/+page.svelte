<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { TextPlugin } from 'gsap/TextPlugin';

  gsap.registerPlugin(TextPlugin);

  let terminalOutput: HTMLElement;
  let welcomeText: HTMLElement;
  let codeBlock: HTMLElement;

  const terminalLines = [
    { id: 1, command: 'npm init portfolio', output: 'Initializing GeekSphere portfolio...' },
    { id: 2, command: 'import { experience } from "./dev-journey"', output: '5+ years of coding adventures loaded' },
    { id: 3, command: 'startCodingJourney()', output: 'Ready to build something amazing...' }
  ];

  onMount(() => {
    const timeline = gsap.timeline({ defaults: { duration: 1.5, ease: 'power4.out' }});

    // Initial terminal appearance animation
    timeline.from(terminalOutput, {
      y: 30,
      opacity: 0,
      duration: 0.8
    });

    // Welcome text typing animation
    timeline.to(welcomeText, {
      duration: 2,
      text: "Welcome to <GeekSphere/>",
      ease: "none"
    });

    // Animate terminal commands sequentially
    let delay = 0;
    terminalLines.forEach((line, index) => {
      // Type command
      timeline.to(`[data-command="${index}"]`, {
        text: `> ${line.command}`,
        duration: 1,
        delay: delay
      });

      // Show output
      timeline.to(`[data-output="${index}"]`, {
        text: line.output,
        duration: 0.8,
        delay: 0.3
      });

      delay += 0.5;
    });

    // Code block reveal animation
    timeline.from(codeBlock, {
      height: 0,
      opacity: 0,
      duration: 0.8
    });
  });
</script>

<div class="section">
  <div class="max-w-4xl mx-auto">
    <!-- Terminal Hero Section -->
    <div 
      bind:this={terminalOutput}
      class="bg-black/50 backdrop-blur-sm rounded-lg border border-geek-secondary/30 p-6 font-code shadow-lg shadow-geek-secondary/5"
    >
      <!-- Terminal Header -->
      <div class="flex items-center gap-2 mb-4 pb-2 border-b border-geek-secondary/20">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
        <span class="ml-2 text-sm opacity-60">portfolio.terminal</span>
      </div>

      <!-- Terminal Content -->
      <div class="space-y-4">
        <h1 bind:this={welcomeText} class="text-3xl md:text-4xl lg:text-5xl font-bold text-geek-secondary">
          <!-- Content will be set by GSAP -->
          <span class="sr-only">Welcome to GeekSphere</span>
        </h1>

        <div class="mt-8 space-y-2">
          {#each terminalLines as line (line.id)}
            <div class="command-line">
              <div data-command={line.id - 1} class="text-geek-accent"></div>
              <div data-output={line.id - 1} class="pl-4 text-geek-text/80"></div>
            </div>
          {/each}
        </div>

        <!-- Code Block -->
        <div 
          bind:this={codeBlock}
          class="mt-6 bg-black/30 p-4 rounded border border-geek-secondary/10"
        >
          <pre class="text-sm"><code>{`const portfolio = {
  name: 'GeekSphere',
  tech: ['SvelteKit', 'TypeScript', 'TailwindCSS'],
  passion: 'Building amazing web experiences',
  status: 'Ready to collaborate!'
};`}</code></pre>
        </div>
      </div>
    </div>

    <!-- Call to Action Buttons -->
    <div class="mt-8 flex flex-wrap gap-4 justify-center">
      <a href="/projects" class="btn btn-primary">
        <span class="text-geek-accent mr-2">&gt;</span> View Projects
      </a>
      <a href="/contact" class="btn bg-black/30 text-geek-secondary border border-geek-secondary/30 hover:bg-geek-secondary/10">
        <span class="text-geek-accent mr-2">&gt;</span> Get in Touch
      </a>
    </div>

    <!-- Tech Stack Grid -->
    <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {#each ['SvelteKit', 'TypeScript', 'TailwindCSS', 'GSAP'] as tech (tech)}
        <div class="p-4 bg-black/30 rounded-lg border border-geek-secondary/20 backdrop-blur-sm">
          <div class="text-geek-secondary font-code">{tech}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="postcss">
  .command-line {
    font-family: 'Fira Code', monospace;
  }

  pre code {
    color: #ecf0f1;
  }
</style>
