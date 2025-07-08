<!--
    CartPopover.svelte

    Shopping cart popover component. Displays cart items, allows quantity management,
    and provides checkout functionality with user authentication check.

    Props: None.
    Events: close (dispatched on modal close), openUserPopover (dispatched when user needs to login).
    Functions: Cart item management, quantity updates, checkout navigation.
-->
<script lang="ts">
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/stores/themeStore';
	import { cartStore, type CartItem } from '$lib/stores/cartStore';
	import { userStore } from '$lib/stores/userStore';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { createEventDispatcher } from 'svelte';

	let currentTheme = $state(browser ? localStorage.getItem('theme') || 'dark' : 'dark');
	const unsubscribe = theme.subscribe((themeValue) => (currentTheme = themeValue));

	const dispatch = createEventDispatcher();

	let totalPrice = $derived(cartStore.getTotalPrice($cartStore));
	let totalItems = $derived(cartStore.getTotalItems($cartStore));

	onDestroy(() => {
		unsubscribe();
	});

	function handleQuantityChange(item: CartItem, newQuantity: number) {
		cartStore.updateQuantity(item.id, item.customization?.id, newQuantity);
	}

	function removeItem(item: CartItem) {
		cartStore.removeItem(item.id, item.customization?.id);
	}

	function proceedToCheckout() {
		if (!$userStore) {
			// User not logged in, open user popover
			dispatch('close');
			dispatch('openUserPopover');
		} else {
			// User logged in, redirect to checkout
			window.location.href = '/checkout';
		}
	}
</script>

<div class="fixed inset-0 z-15 flex items-center justify-center">
	<div
		class="absolute inset-0 bg-black/50"
		role="button"
		tabindex="0"
		onclick={() => dispatch('close')}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				dispatch('close');
			}
		}}
	></div>

	<div
		in:fly={{ y: 200, duration: 300 }}
		out:fly={{ y: 200, duration: 300 }}
		class="relative {currentTheme === 'dark'
			? 'bg-neutral-900'
			: 'bg-gray-100'} max-w-[90vw] min-w-[320px] max-h-[90vh] overflow-hidden rounded-lg p-4 shadow-lg "
	>
		<h2 class="text-xl font-semibold mb-4 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
			Panier ({totalItems} article{totalItems > 1 ? 's' : ''})
		</h2>

		{#if $cartStore.length === 0}
			<div class="text-center py-8">
				<p class="text-lg {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">
					Votre panier est vide
				</p>
			</div>
		{:else}
			<div class="max-h-[65vh] overflow-y-auto mb-4">
				{#each $cartStore as item}
					<div class="flex items-center gap-3 py-3 border-b {currentTheme === 'dark' ? 'border-neutral-700' : 'border-neutral-300'}">
						<img
							src={`/img/Produits/${item.id}.jpg`}
							alt={item.name}
							class="w-16 h-16 rounded-lg object-cover"
						/>
						<div class="flex-1">
							<h4 class="font-medium {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
								{item.name}
							</h4>
							{#if item.customization}
								<p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">
									Personnalisé: {item.customization.name}
								</p>
							{/if}
							{#if item.size}
								<p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">
									Taille: {item.size}
								</p>
							{/if}
							<p class="text-sm font-semibold {currentTheme === 'dark' ? 'text-amber-400' : 'text-amber-600'}">
								${item.price.toFixed(2)}
							</p>
						</div>
						<div class="flex items-center gap-2">
							<button
								class="w-8 h-8 rounded-full {currentTheme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'} flex items-center justify-center transition-colors"
								onclick={() => handleQuantityChange(item, item.quantity - 1)}
							>
								-
							</button>
							<span class="w-8 text-center {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
								{item.quantity}
							</span>
							<button
								class="w-8 h-8 rounded-full {currentTheme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'} flex items-center justify-center transition-colors"
								onclick={() => handleQuantityChange(item, item.quantity + 1)}
							>
								+
							</button>
							<button
								class="ml-2 w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 flex items-center justify-center transition-colors"
								onclick={() => removeItem(item)}
								title="Supprimer"
							>
								×
							</button>
						</div>
					</div>
				{/each}
			</div>

			<div class="border-t {currentTheme === 'dark' ? 'border-neutral-700' : 'border-neutral-300'} pt-4">
				<div class="flex justify-between items-center mb-4">
					<span class="text-lg font-semibold {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
						Total:
					</span>
					<span class="text-lg font-bold {currentTheme === 'dark' ? 'text-amber-400' : 'text-amber-600'}">
						${totalPrice.toFixed(2)}
					</span>
				</div>
				<button
					class="w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-amber-600 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:outline-none"
					onclick={proceedToCheckout}
				>
					{$userStore ? 'Procéder à la commande' : 'Se connecter pour commander'}
				</button>
			</div>
		{/if}
	</div>
</div>
