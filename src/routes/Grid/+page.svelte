<!-- Module de grille de produits -->

<script lang="ts">
	import Item from '../Item/+page.svelte';
	import { onMount } from 'svelte';

	type ProductGridItem = { id: number; isAvailable: number };
	let products: ProductGridItem[] = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/products/count');
			if (response.ok) {
				const data = await response.json();
				if (data && typeof data.count === 'number') {
					const ids = Array.from({ length: data.count }, (_, i) => i + 1);
					const availabilityResults = await Promise.all(
						ids.map(async (id) => {
							try {
								const res = await fetch(`/api/products/isAvailable?id=${id}`);
								if (res.ok) {
									const avail = await res.json();
									return { id, isAvailable: avail.isAvailable };
								}
							} catch (e) {
								console.error(`Error fetching isAvailable for product ${id}:`, e);
							}
							return { id, isAvailable: 0 };
						})
					);
					products = availabilityResults;
				} else {
					console.error('Invalid count received:', data);
					products = [];
				}
			} else {
				console.error('Failed to fetch product count:', response.status);
				products = [];
			}
		} catch (error) {
			console.error('Error fetching product count:', error);
			products = [];
		}
	});
</script>

<div
	class=" grid grid-cols-1 place-content-around place-items-center gap-6 p-4 transition-colors duration-300 sm:grid-cols-2 md:grid-cols-4"
>
	{#if products.length > 0}
		{#each products as product (product.id)}
			{#if product.isAvailable === 1}
				<Item productId={product.id} />
			{/if}
		{/each}
	{:else}
		<p class="light:text-black col-span-full text-center text-white dark:text-white">
			Loading products or no products found...
		</p>
	{/if}
</div>
