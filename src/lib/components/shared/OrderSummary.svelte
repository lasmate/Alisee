<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/stores/themeStore';
	import { cartStore } from '$lib/stores/cartStore';
	import { userStore } from '$lib/stores/userStore';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	const { firstName, lastName, address, city, postalCode, country, orderId } = $props<{
		firstName: string;
		lastName: string;
		address: string;
		city: string;
		postalCode: string;
		country: string;
		orderId: string;
	}>();

	let currentTheme = $state(browser ? localStorage.getItem('theme') || 'dark' : 'dark');
	const unsubscribe = theme.subscribe((themeValue) => (currentTheme = themeValue));

	const dispatch = createEventDispatcher<{
		close: void;
	}>();

	let totalPrice = $derived(cartStore.getTotalPrice($cartStore));

	function confirmOrder() {
		// Clear the cart
		cartStore.clearCart();
		// Redirect to home page
		goto('/');
	}

	function handleOutsideClick() {
		// Clear the cart and redirect to home when clicking outside
		cartStore.clearCart();
		goto('/');
	}
</script>

<div class="fixed inset-0 z-20 flex items-center justify-center">
	<div
		class="absolute inset-0 bg-black/50"
		role="button"
		tabindex="0"
		onclick={handleOutsideClick}
		onkeydown={(e) => e.key === 'Escape' && handleOutsideClick()}
	></div>

	<div
		in:fly={{ y: 200, duration: 300 }}
		out:fly={{ y: 200, duration: 300 }}
		class="relative {currentTheme === 'dark'
			? 'bg-neutral-900'
			: 'bg-gray-100'} max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg p-6 m-4"
	>
		<h2 class="text-2xl font-bold mb-6 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
			Confirmation de commande
		</h2>

		<div class="mb-6 p-4 rounded-lg {currentTheme === 'dark' ? 'bg-green-800' : 'bg-green-100'}">
			<p class="text-lg font-semibold {currentTheme === 'dark' ? 'text-green-200' : 'text-green-800'}">
				Commande confirmée!
			</p>
			<p class="text-sm {currentTheme === 'dark' ? 'text-green-300' : 'text-green-700'}">
				Commande ID: #{orderId || 'N/A'}
			</p>
		</div>

		<!-- Customer Info -->
		<div class="mb-6">
			<h3 class="text-lg font-semibold mb-3 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
				Informations client
			</h3>
			<div class="p-4 rounded-lg {currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'}">
				<p class="{currentTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}">
					<strong>Nom:</strong> {firstName} {lastName}
				</p>
				<p class="{currentTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}">
					<strong>Email:</strong> {$userStore?.email}
				</p>
			</div>
		</div>

		<!-- Shipping Address -->
		<div class="mb-6">
			<h3 class="text-lg font-semibold mb-3 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
				Adresse de livraison
			</h3>
			<div class="p-4 rounded-lg {currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'}">
				<p class="{currentTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}">
					{firstName} {lastName}
				</p>
				<p class="{currentTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}">
					{address}
				</p>
				<p class="{currentTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}">
					{city}, {postalCode}
				</p>
				<p class="{currentTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}">
					{country}
				</p>
			</div>
		</div>

		<!-- Order Items -->
		<div class="mb-6">
			<h3 class="text-lg font-semibold mb-3 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
				Articles commandés
			</h3>
			<div class="space-y-3">
				{#each $cartStore as item}
					<div class="flex items-center gap-4 p-4 rounded-lg {currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'}">
						<img
							src={`/img/Produits/${item.id}.jpg`}
							alt={item.name}
							class="w-16 h-16 rounded-lg object-cover"
						/>
						<div class="flex-1">
							<h4 class="font-medium {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
								{item.name}
							</h4>
							{#if item.customization && item.customization.name}
								<p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">
									Personnalisé: {item.customization.name}
								</p>
							{/if}
							{#if item.size}
								<p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">
									Taille: {item.size}
								</p>
							{/if}
							<p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">
								Quantité: {item.quantity}
							</p>
						</div>
						<div class="text-right">
							<p class="font-semibold {currentTheme === 'dark' ? 'text-amber-400' : 'text-amber-600'}">
								${(item.price * item.quantity).toFixed(2)}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Total -->
		<div class="border-t {currentTheme === 'dark' ? 'border-neutral-600' : 'border-neutral-300'} pt-4 mb-6">
			<div class="flex justify-between items-center text-xl font-bold">
				<span class="{currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">Total payé:</span>
				<span class="{currentTheme === 'dark' ? 'text-amber-400' : 'text-amber-600'}">
					${totalPrice.toFixed(2)}
				</span>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="flex justify-center">
			<button
				class="px-8 py-3 rounded-lg bg-amber-500 text-neutral-900 hover:bg-amber-600 transition-colors font-semibold text-lg"
				onclick={confirmOrder}
			>
				Terminer
			</button>
		</div>
	</div>
</div>
