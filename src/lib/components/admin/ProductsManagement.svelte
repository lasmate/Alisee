<!--
    ProductsManagement.svelte

    Admin component to manage products. Displays a table with product details 
    (ID, name, price, quantity, availability) and allows toggling availability.

    Props: currentTheme (string).
    Events: close (dispatched on modal close).
    Functions: toggleProductAvailability, formatPrice.
-->
<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let currentTheme: string;
	let products: Product[] = [];
	let loading: boolean = false;

	type Product = {
		id: number;
		name: string;
		description: string;
		image: string;
		size?: string;
		price: number;
		quantity: number;
		category: string;
		tags: string;
		isAvailable: number;
		isCustomisable: number;
	};

	onMount(async () => {
		loading = true;
		try {
			const res = await fetch('/api/admin/products');
			if (res.ok) {
				products = await res.json();
			}
		} catch (e) {
			console.error('Failed to fetch products', e);
		} finally {
			loading = false;
		}
	});

	async function toggleProductAvailability(product: Product) {
		try {
			const newAvailability = product.isAvailable === 1 ? 0 : 1;
			const response = await fetch('/api/admin/products', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: product.id, isAvailable: newAvailability })
			});

			if (response.ok) {
				product.isAvailable = newAvailability;
				products = [...products]; // Trigger reactivity
			}
		} catch (error) {
			console.error('Error toggling product availability:', error);
		}
	}

	function formatPrice(price: number) {
		return (price / 100).toFixed(2);
	}
</script>

<div class="fixed inset-0 z-15 flex items-center justify-center">
	<div
		class="absolute inset-0 bg-black/50"
		role="button"
		tabindex="0"
		on:click={() => dispatch('close')}
		on:keydown={(e) => e.key === 'Escape' && dispatch('close')}
	></div>
	<div
		in:fly={{ y: 200, duration: 300 }}
		out:fly={{ y: 200, duration: 300 }}
		class="relative {currentTheme === 'dark'
			? 'bg-neutral-900'
			: 'bg-gray-100'} overflow-auto rounded-lg p-6"
	>
		{#if loading}
			<div class="flex items-center justify-center py-8">
				<div
					class="h-8 w-8 animate-spin rounded-full border-b-2 {currentTheme === 'dark'
						? 'border-white'
						: 'border-gray-900'}"
				></div>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="min-w-full">
					<thead class={currentTheme === 'dark' ? 'bg-neutral-700' : 'bg-gray-50'}>
						<tr>
							<th
								class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								ID
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Nom
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Prix
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Quantité
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Disponible
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Actions
							</th>
						</tr>
					</thead>
					<tbody
						class="{currentTheme === 'dark'
							? 'bg-neutral-800'
							: 'bg-white'} divide-y {currentTheme === 'dark'
							? 'divide-neutral-700'
							: 'divide-gray-200'}"
					>
						{#each products as product}
							<tr>
								<td
									class="px-6 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{product.id}
								</td>
								<td
									class="px-6 py-4 text-sm font-medium whitespace-nowrap {currentTheme === 'dark'
										? 'text-white'
										: 'text-gray-900'}"
								>
									{product.name}
								</td>
								<td
									class="px-6 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{product.price.toFixed(2)}€
								</td>
								<td
									class="px-6 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{product.quantity}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span
										class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold {product.isAvailable ===
										1
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800'}"
									>
										{product.isAvailable === 1 ? 'Oui' : 'Non'}
									</span>
								</td>
								<td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
									<button
										on:click={() => toggleProductAvailability(product)}
										class="rounded px-3 py-1 text-xs {product.isAvailable === 1
											? 'bg-red-500 text-white hover:bg-red-600'
											: 'bg-green-500 text-white hover:bg-green-600'} transition-colors"
									>
										{product.isAvailable === 1 ? 'Désactiver' : 'Activer'}
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
