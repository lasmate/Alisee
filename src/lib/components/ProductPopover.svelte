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
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let imgCount = 0;

	// strongly-typed dispatcher
	const dispatch = createEventDispatcher<{ close: void }>();

	let currentTheme = browser ? localStorage.getItem('theme') || 'dark' : 'dark';

	const unsubscribe = theme.subscribe((themeValue) => {
		currentTheme = themeValue;
	});

	onMount(() => {
		(async () => {
			// Set initial theme
			currentTheme = $theme;
			// fetch total image count
			try {
				const res = await fetch('/api/images/count');
				const data = await res.json();
				imgCount = data.count || 0;
				//console.log('imgCount:', imgCount);
			} catch {
				imgCount = 0;
			}
		})();
		return () => unsubscribe();
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
		class="relative {currentTheme === 'dark'
			? 'bg-neutral-900'
			: 'bg-gray-100'} overflow-auto rounded-lg p-6"
	>
		<div class="mt-2 grid grid-cols-2 gap-2">
			<div class="m-2 basis-1/3">
				<img
					src={`src/img/Produits/${item.id}.jpg`}
					alt="Product ${item.id} image"
					height={10}
					width={10}
					class="h-60 w-full rounded-xl object-cover opacity-75"
				/>
			</div>
			<div class="basis-2/3">
				<div class="flex flex-row items-center justify-between pt-2">
					<h3
						class="text-xl font-semibold {currentTheme === 'dark'
							? 'text-neutral-200'
							: 'text-neutral-800'}"
					>
						{item.name}
					</h3>
					<p
						class="text-[13px] {currentTheme === 'dark'
							? 'text-neutral-300'
							: 'text-neutral-700'} select-none"
					>
						${item.price.toFixed(2)}
					</p>
				</div>
				{#if imgCount > 0}
					<div class="grid grid-cols-4 md:grid-cols-8 gap-1.5 my-1 max-h-60 md:max-h-80 overflow-y-auto overflow-x-hidden">
						{#each Array(imgCount) as _, i}
							<span
								class="inline-block w-16 h-16 md:w-12 md:h-12 rounded-full transition-colors"
								class:bg-white={currentTheme === 'dark'}
								class:bg-black={currentTheme === 'light'}>
								
							</span>
						{/each}
					</div>
				
				{/if}
				<p
					class="text-sm leading-[1.5] {currentTheme === 'dark'
						? 'text-neutral-400'
						: 'text-neutral-600'} pb-3"
				>
					{item.description}
				</p>
				{#if item.size}
					<p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">
						Taille: {item.size}
					</p>
				{/if}
				<div>

				</div>
			</div>
		</div>
		<div class="mt-4">
			<button
				class="w-full rounded-lg {currentTheme === 'dark'
					? 'bg-amber-500 text-neutral-900 hover:bg-amber-600'
					: 'bg-amber-500 text-neutral-900 hover:bg-amber-600'} px-4 py-2 text-sm font-semibold focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:outline-none"
				on:click={() => dispatch('close')}
			>
				Close
			</button>
		</div>
	</div>
</div>
