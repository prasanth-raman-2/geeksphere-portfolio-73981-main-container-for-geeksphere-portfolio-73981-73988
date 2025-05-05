<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // PUBLIC_INTERFACE
  export interface FormData {
    name: string;
    email: string;
    message: string;
  }

  const dispatch = createEventDispatcher<{
    submit: FormData;
  }>();

  let formData: FormData = {
    name: '',
    email: '',
    message: ''
  };

  let errors: Partial<Record<keyof FormData, string>> = {};
  let currentStep = 0;
  let submitted = false;

  const steps = [
    { field: 'name' as const, prompt: 'Enter your name:' },
    { field: 'email' as const, prompt: 'Enter your email:' },
    { field: 'message' as const, prompt: 'Enter your message:' }
  ];

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(field: keyof FormData): boolean {
    errors[field] = '';

    switch (field) {
      case 'name':
        if (!formData.name.trim()) {
          errors.name = 'Name is required';
          return false;
        }
        break;

      case 'email':
        if (!formData.email.trim()) {
          errors.email = 'Email is required';
          return false;
        }
        if (!validateEmail(formData.email)) {
          errors.email = 'Invalid email format';
          return false;
        }
        break;

      case 'message':
        if (!formData.message.trim()) {
          errors.message = 'Message is required';
          return false;
        }
        break;
    }

    return true;
  }

  function handleSubmit() {
    let isValid = true;
    for (const step of steps) {
      if (!validateField(step.field)) {
        isValid = false;
        currentStep = steps.indexOf(step);
        break;
      }
    }

    if (isValid) {
      submitted = true;
      dispatch('submit', formData);
    }
  }

  function handleInput(field: keyof FormData) {
    if (validateField(field)) {
      currentStep = steps.findIndex(step => step.field === field) + 1;
    }
  }
</script>

<div class="bg-black/50 backdrop-blur-sm rounded-lg border border-geek-secondary/30 overflow-hidden">
  <!-- Terminal Header -->
  <div class="flex items-center gap-2 p-4 bg-black/30 border-b border-geek-secondary/20">
    <div class="w-3 h-3 rounded-full bg-red-500"></div>
    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
    <div class="w-3 h-3 rounded-full bg-green-500"></div>
    <span class="ml-2 text-sm opacity-60 font-code">contact.terminal</span>
  </div>

  <!-- Terminal Content -->
  <div class="p-6 font-code">
    {#if !submitted}
      <form
        on:submit|preventDefault={handleSubmit}
        class="space-y-6"
        novalidate
      >
        {#each steps as step, index}
          <div class={currentStep >= index ? '' : 'opacity-50'}>
            <div class="flex items-center space-x-2 mb-2">
              <span class="text-geek-accent">&gt;</span>
              <span>{step.prompt}</span>
            </div>

            {#if step.field === 'message'}
              <textarea
                bind:value={formData[step.field]}
                on:input={() => handleInput(step.field)}
                rows="4"
                class="w-full bg-black/30 border border-geek-secondary/30 rounded p-3 focus:border-geek-secondary focus:ring-1 focus:ring-geek-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentStep < index}
                aria-invalid={!!errors[step.field]}
                aria-errormessage={`error-${step.field}`}
              ></textarea>
            {:else}
              <input
                type={step.field === 'email' ? 'email' : 'text'}
                bind:value={formData[step.field]}
                on:input={() => handleInput(step.field)}
                class="w-full bg-black/30 border border-geek-secondary/30 rounded p-3 focus:border-geek-secondary focus:ring-1 focus:ring-geek-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentStep < index}
                aria-invalid={!!errors[step.field]}
                aria-errormessage={`error-${step.field}`}
              />
            {/if}

            {#if errors[step.field]}
              <div
                id="error-{step.field}"
                class="mt-1 text-red-400 text-sm"
                role="alert"
              >
                {errors[step.field]}
              </div>
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

<style>
  textarea,
  input {
    font-family: 'Fira Code', monospace;
  }

  pre code {
    color: #ecf0f1;
  }
</style>
