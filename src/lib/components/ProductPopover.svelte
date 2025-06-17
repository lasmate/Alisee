<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { theme } from '$lib/stores/themeStore';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // strongly-typed dispatcher
  const dispatch = createEventDispatcher<{ close: void }>();

  let currentTheme = browser ? (localStorage.getItem('theme') || 'dark') : 'dark';

  const unsubscribe = theme.subscribe((themeValue) => {
    currentTheme = themeValue;
  });
  
  onMount(() => {
    // Set initial theme
    currentTheme = $theme;
    return unsubscribe;
  });

  export let item: Item;
</script>

<script context="module" lang="ts">
  export interface Item { id: number; name: string; description: string; size?: string; price: number; }
</script>


<div class="fixed inset-0 flex items-center justify-center z-15">
  <div class="absolute inset-0 bg-black/50" role="button" tabindex="0" on:click={() => dispatch('close')} on:keydown={() => dispatch('close')}></div>
  <div class="relative {currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}  rounded-lg overflow-auto p-6">
    <div class="grid grid-cols-2 gap-2 mt-2">
        <div class="basis-1/2  m-2 "><img
        src={`src/img/Produits/${item.id}.jpg`}
        alt="Product ${item.id} image"
        height={10}
        width={10}
        class="rounded-xl h-52 w-full object-cover opacity-75"
      />
        </div>
        <div class="basis-1/2"><div class="flex flex-row items-center justify-between pt-2">
        <h3 class="text-xl font-semibold {currentTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}">{item.name}</h3>
        <p class="text-[13px] {currentTheme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'} select-none">${item.price.toFixed(2)}</p>
      </div>
      <p class="text-sm leading-[1.5] {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'} pb-3">{item.description}</p>
      {#if item.size}
        <p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">Size: {item.size}</p>
      {/if} 
    </div>
</div>
    <div class="mt-4 ">
      <button
        class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        on:click={() => dispatch('close')}
      >
        Close
      </button>
    </div>
  </div>
</div>
