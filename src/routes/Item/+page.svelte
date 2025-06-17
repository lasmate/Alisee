<script>
  import ProductPopover from '$lib/components/ProductPopover.svelte';
  import { Motion, useMotionTemplate, useMotionValue } from "svelte-motion";
  import { theme } from '$lib/stores/themeStore';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  export let productId;
  let showPopover = false;
  
  let item = { id: 0, name: '', description: '', size: '', price: 0 };
  // Initialize with actual stored theme
  let currentTheme = browser ? (localStorage.getItem('theme') || 'dark') : 'dark';

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  let background = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(60, 60, 60, 0.4), transparent 80%)`;
  
  // Subscribe to theme changes
  const unsubscribe = theme.subscribe((themeValue) => {
    currentTheme = themeValue;
  });
  
  onMount(() => {
    // Set initial theme
    currentTheme = $theme;
    
    // Fetch product data
    fetch(`/Item?productId=${productId}`)
      .then(res => res.json())
      .then(data => {
        item = data;
      });
    
    return unsubscribe;
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mousemove={(e) => { const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }} class="group relative max-w-[350px] w-full overflow-hidden rounded-xl {currentTheme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300">
  <div class="absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent {currentTheme === 'dark' ? 'via-white/30' : 'via-black/30'} via-10% to-transparent"></div>
  <Motion style={{background, }} let:motion  >
    <div use:motion class="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100">
    </div>
  </Motion>
  <div class="relative flex flex-col gap-3 rounded-xl border {currentTheme === 'dark' ? 'border-white/10' : 'border-black/10'} px-4 py-5">
    <div class="space-y-2">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img
        src={`src/img/Produits/${productId}.jpg`}
        alt="Product ${productId} image"
        height={10}
        width={10}
        class="rounded-xl h-52 w-full object-cover opacity-75"
      />
      <div class="flex flex-row items-center justify-between pt-2">
        <h3 class="text-xl font-semibold {currentTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}">{item.name}</h3>
        <p class="text-[13px] {currentTheme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'} select-none">${item.price.toFixed(2)}</p>
      </div>
      <p class="text-sm leading-[1.5] {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'} pb-3">{item.description}</p>
      {#if item.size}
        <p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">Size: {item.size}</p>
      {/if}

      <button on:click={() => showPopover = true} class="w-full rounded-lg {currentTheme === 'dark' ? 'bg-amber-500 hover:bg-amber-600 text-neutral-900' : 'bg-amber-500 hover:bg-amber-600 text-neutral-900'} px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2" >
        Customiser
      </button>

    

      <button class="w-full rounded-lg {currentTheme === 'dark' ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-200' : 'bg-neutral-300 hover:bg-neutral-400 text-neutral-800'} px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 transition-colors duration-300">
        Ajouter au panier
      </button>
    </div>
  </div>
</div>

{#if showPopover}
  <ProductPopover {item} on:close={() => showPopover = false} />
{/if}
