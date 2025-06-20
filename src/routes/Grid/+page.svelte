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

<div
	class=" grid grid-cols-1 place-content-around place-items-center gap-6 p-4 transition-colors duration-300 sm:grid-cols-2 md:grid-cols-4"
>
	{#if productIds.length > 0}
		{#each productIds as id (id)}
			<Item productId={id} />
		{/each}
	{:else}
		<p class="light:text-black col-span-full text-center text-white dark:text-white">
			Loading products or no products found...
		</p>
	{/if}
</div>
