<!-- Module de détail du produit -->
<script>
	import ProductPopover from '$lib/components/shared/ProductPopover.svelte';
	import { Motion, useMotionTemplate, useMotionValue } from 'svelte-motion';
	import { theme } from '$lib/stores/themeStore';
	import { browser } from '$app/environment';

	// Props using runes
	let { productId } = $props();

	// State using runes
	let showPopover = $state(false);
	let item = $state({ id: 0, name: '', description: '', size: '', price: 0 });

	// Derived state for theme
	let currentTheme = $derived(browser ? $theme : 'dark');

	let mouseX = useMotionValue(0);
	let mouseY = useMotionValue(0);
	let background = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(60, 60, 60, 0.4), transparent 80%)`;

	// Effect for fetching product data
	$effect(() => {
		if (productId) {
			fetch(`/Item?productId=${productId}`)
				.then((res) => res.json())
				.then((data) => {
					item = data;
				});
		}
	});
</script>

<div
	role="region"
	onmousemove={(e) => {
		const { left, top } = e.currentTarget.getBoundingClientRect();
		mouseX.set(e.clientX - left);
		mouseY.set(e.clientY - top);
	}}
	class="group relative w-full max-w-[350px] overflow-hidden rounded-xl {currentTheme === 'dark'
		? 'bg-neutral-900'
		: 'bg-white'} transition-colors duration-300"
>
	<div
		class="absolute top-0 right-5 h-px w-80 bg-gradient-to-l from-transparent {currentTheme ===
		'dark'
			? 'via-white/30'
			: 'via-black/30'} via-10% to-transparent"
	></div>
	<Motion style={{ background }} let:motion>
		<div
			use:motion
			class="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
		></div>
	</Motion>
	<div
		class="relative flex flex-col gap-3 rounded-xl border {currentTheme === 'dark'
			? 'border-white/10'
			: 'border-black/10'} px-4 py-5"
	>
		<div class="space-y-2">
			<!-- Product image -->
			<img
				src={`/img/Produits/${productId}.jpg`}
				alt="Product ${productId} image"
				height={10}
				width={10}
				class="h-52 w-full rounded-xl object-cover opacity-75"
			/>
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
			<p
				class="text-sm leading-[1.5] {currentTheme === 'dark'
					? 'text-neutral-400'
					: 'text-neutral-600'} pb-3"
			>
				{item.description}
			</p>
			{#if item.size}
				<p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">
					Size: {item.size}
				</p>
			{/if}

			<button
				onclick={() => (showPopover = true)}
				class="w-full rounded-lg {currentTheme === 'dark'
					? 'bg-amber-500 text-neutral-900 hover:bg-amber-600'
					: 'bg-amber-500 text-neutral-900 hover:bg-amber-600'} px-4 py-2 text-sm font-semibold focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:outline-none"
			>
				Customiser
			</button>
		</div>
	</div>
</div>

{#if showPopover}
	<ProductPopover {item} on:close={() => (showPopover = false)} />
{/if}
