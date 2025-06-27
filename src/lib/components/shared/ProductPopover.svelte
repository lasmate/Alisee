<script context="module" lang="ts">
	export interface Item {
		id: number;
		name: string;
		description: string;
		size?: string;
		price: number;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/stores/themeStore';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let imgCount = 0;
	let images: { id: number; name: string; img_path: string }[] = [];
	let selectedImageId: number | null = null;
	$: selectedImage = selectedImageId ? images.find((img) => img.id === selectedImageId) : null;

	const dispatch = createEventDispatcher<{
		close: void;
		addToCart: { item: Item; customization?: { id: number; name: string; img_path: string } };
	}>();

	let currentTheme = browser ? localStorage.getItem('theme') || 'dark' : 'dark';
	const unsubscribe = theme.subscribe((themeValue) => (currentTheme = themeValue));

	onMount(() => {
		(async () => {
			currentTheme = $theme;
			try {
				const res = await fetch('/api/images/count');
				const data = await res.json();
				imgCount = data.count || 0;

				if (imgCount > 0) {
					const imagePromises = [];
					for (let i = 1; i <= imgCount; i++) {
						imagePromises.push(
							fetch(`/api/images/${i}`)
								.then((res) => (res.ok ? res.json() : null))
								.catch(() => null)
						);
					}
					const imageResults = await Promise.all(imagePromises);
					images = imageResults.filter((img) => img !== null);
				}
			} catch {
				imgCount = 0;
				images = [];
			}
		})();
	});

	onDestroy(() => {
		unsubscribe();
	});

	export let item: Item;
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
		class="relative {currentTheme === 'dark' ? 'bg-neutral-900' : 'bg-gray-100'} overflow-auto rounded-lg p-6">
		<div class="mt-2 grid grid-cols-2 gap-2">
			<div class="m-2 basis-1/3">
				<img
					src={`/img/Produits/${item.id}.jpg`}
					alt="Product ${item.id}"
					class="h-100 w-full rounded-xl object-cover"
				/>
			</div>
			<div class="basis-2/3">
				<div class="flex flex-row items-center justify-between pt-2">
					<h3
						class="text-xl font-semibold {currentTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}">
						{item.name}
					</h3>
					<p
						class="text-[13px] {currentTheme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'} select-none">
						${item.price.toFixed(2)}
					</p>
				</div>
				{#if images.length > 0}
					<div
						class="my-1 grid max-h-60 grid-cols-4 gap-1.5 overflow-x-hidden overflow-y-auto md:max-h-80 md:grid-cols-8"
					>
						{#each images as image}
							<button
								class="relative inline-block h-18 w-18 overflow-hidden rounded-full border-2 transition-all duration-200 md:h-14 md:w-14"
								class:border-amber-500={selectedImageId === image.id}
								class:border-transparent={selectedImageId !== image.id}
								class:ring-2={selectedImageId === image.id}
								class:ring-amber-400={selectedImageId === image.id}
								on:click={() => (selectedImageId = image.id)}
								title={image.name}
							>
								<img
									src={`/img/Visuel/${image.img_path}`}
									alt={image.name}
									class="h-full w-full rounded-full object-cover"
									loading="lazy"
								/>
							</button>
						{/each}
					</div>
				{/if}
				<p
					class="text-sm leading-[1.5] {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'} pb-3">
					{item.description}
				</p>
				{#if item.size}
					<p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">
						Taille: {item.size}
					</p>
				{/if}
				{#if selectedImage}
					<div class="mt-3 rounded-lg p-2 {currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-gray-200'}">
						<p class="text-sm font-medium {currentTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}">
							Personnalisation sélectionnée: {selectedImage.name}
						</p>
					</div>
				{/if}
			</div>
		</div>
		<div class="mt-4">
			<button
				class="w-full rounded-lg {currentTheme === 'dark'
					? 'bg-amber-500 text-neutral-900 hover:bg-amber-600'
					: 'bg-amber-500 text-neutral-900 hover:bg-amber-600'} px-4 py-2 text-sm font-semibold transition-colors focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:outline-none"
				on:click={() => dispatch('addToCart', { item, customization: selectedImage ?? undefined })}
			>
				Ajouter au panier
			</button>
		</div>
	</div>
</div>
