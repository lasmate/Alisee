<script lang="ts">
  import Item from '../Item/+page.svelte';
  import { onMount } from 'svelte';

  let productIds: number[] = [];

  onMount(async () => {
    try {
      const response = await fetch('/api/products/count');
      if (response.ok) {
        const data = await response.json();
        if (data && typeof data.count === 'number') {
          productIds = Array.from({ length: data.count }, (_, i) => i + 1);
        } else {
          console.error('Invalid count received:', data);
          productIds = [];
        }
      } else {
        console.error('Failed to fetch product count:', response.status);
        productIds = [];
      }
    } catch (error) {
      console.error('Error fetching product count:', error);
      productIds = [];
    }
  });
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 place-content-around place-items-center bg-black dark:bg-black light:bg-white transition-colors duration-300">
  {#if productIds.length > 0}
    {#each productIds as id (id)}
      <Item productId={id} />
    {/each}
  {:else}
    <p class="text-center col-span-full text-white dark:text-white light:text-black">Loading products or no products found...</p>
  {/if}
</div>