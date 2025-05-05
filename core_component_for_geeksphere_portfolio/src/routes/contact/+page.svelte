<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let formContainer: HTMLElement;
  let currentStep = 0;
  let formData = {
    name: '',
    email: '',
    message: ''
  };

  const steps = [
    { id: 'name', field: 'name', prompt: 'Enter your name:' },
    { id: 'email', field: 'email', prompt: 'Enter your email:' },
    { id: 'message', field: 'message', prompt: 'Enter your message:' }
  ];

  let submitted = false;

  function handleSubmit() {
    submitted = true;
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
  }

  onMount(() => {
    gsap.from(formContainer, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out'
    });
  });
</script>

<div class="section">
  <div class="max-w-2xl mx-auto">
    <h1 class="text-4xl md:text-5xl font-bold mb-8">
      <span class="text-geek-accent">&lt;</span>
      Contact
      <span class="text-geek-accent">/&gt;</span>
    </h1>

    <div 
      bind:this={formContainer}
      class="bg-black/50 backdrop-blur-sm rounded-lg border border-geek-secondary/30 overflow-hidden"
    >
      <!-- Terminal Header -->
      <div class="flex items-center gap-2 p-4 bg-black/30 border-b border-geek-secondary/20">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
        <span class="ml-2 text-sm opacity-60">contact.terminal</span>
      </div>

      <!-- Terminal Content -->
      <div class="p-6 font-code">
        {#if !submitted}
          <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            {#each steps as step (step.id)}
              <div class="{currentStep >= steps.indexOf(step) ? '' : 'opacity-50'}">
                <div class="flex items-center space-x-2 mb-2">
                  <span class="text-geek-accent">&gt;</span>
                  <span>{step.prompt}</span>
                </div>
                
                {#if step.field === 'message'}
                  <textarea
                    bind:value={formData[step.field]}
                    on:input={() => currentStep = steps.indexOf(step) + 1}
                    rows="4"
                    class="w-full bg-black/30 border border-geek-secondary/30 rounded p-3 focus:border-geek-secondary focus:ring-1 focus:ring-geek-secondary"
                    disabled={currentStep < steps.indexOf(step)}
                  ></textarea>
                {:else}
                  <input
                    type={step.field === 'email' ? 'email' : 'text'}
                    bind:value={formData[step.field]}
                    on:input={() => currentStep = steps.indexOf(step) + 1}
                    class="w-full bg-black/30 border border-geek-secondary/30 rounded p-3 focus:border-geek-secondary focus:ring-1 focus:ring-geek-secondary"
                    disabled={currentStep < steps.indexOf(step)}
                  >
                {/if}
              </div>
            {/each}

            {#if currentStep === steps.length}
              <button 
                type="submit"
                class="btn btn-primary w-full"
              >
                <span class="text-geek-primary mr-2">&gt;</span> Send Message
              </button>
            {/if}
          </form>
        {:else}
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <span class="text-geek-accent">&gt;</span>
              <span>Message sent successfully!</span>
            </div>
            <pre class="bg-black/30 p-4 rounded"><code>status: 200 OK
message: "Thank you for reaching out!"
response: "I'll get back to you soon!"</code></pre>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  textarea, input {
    font-family: 'Fira Code', monospace;
  }

  pre code {
    color: #ecf0f1;
  }
</style>
