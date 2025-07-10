<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/themeStore';
	import { userStore } from '$lib/stores/userStore';
	import { cartStore } from '$lib/stores/cartStore';
	import { goto } from '$app/navigation';
	import OrderSummary from '$lib/components/shared/OrderSummary.svelte';

	let currentTheme = $state(browser ? localStorage.getItem('theme') || 'dark' : 'dark');
	let showOrderSummary = $state(false);
	let mounted = $state(false);

	// Form data
	let firstName = $state('');
	let lastName = $state('');
	let address = $state('');
	let city = $state('');
	let postalCode = $state('');
	let country = $state('');
	let cardNumber = $state('');
	let expiryDate = $state('');
	let cvv = $state('');
	let cardholderName = $state('');

	let isProcessingOrder = $state(false);
	let orderError = $state('');
	let orderId = $state('');

	// Derived values
	let isFormValid = $derived(
		[firstName, lastName, address, city, postalCode, country, cardNumber, expiryDate, cvv, cardholderName]
			.every(field => field.trim() !== '')
	);
	let totalPrice = $derived(cartStore.getTotalPrice($cartStore));

	// Theme subscription
	const unsubscribe = theme.subscribe((themeValue) => (currentTheme = themeValue));

	// Redirects after mount
	$effect(() => {
		if (mounted) {
			if (!$userStore || $cartStore.length === 0) {
				goto('/');
			}
		}
	});

	onMount(() => {
		setTimeout(() => mounted = true, 100);
		return unsubscribe;
	});

	async function handleCheckout() {
		if (!isFormValid) return;
		
		isProcessingOrder = true;
		orderError = '';

		try {
			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					firstName, lastName, address, city, postalCode, country,
					totalPrice, items: $cartStore
				})
			});

			const result = await response.json();

			if (response.ok) {
				orderId = result.orderId.toString();
				showOrderSummary = true;
			} else {
				orderError = result.error || 'Erreur lors de la création de la commande';
			}
		} catch {
			orderError = 'Erreur de connexion. Veuillez réessayer.';
		} finally {
			isProcessingOrder = false;
		}
	}

	const formatCardNumber = (value: string) => value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
	const formatExpiryDate = (value: string) => value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');

	// svelte-ignore state_referenced_locally
		const inputClass = `w-full px-3 py-2 border rounded-lg ${currentTheme === 'dark' 
		? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
		: 'bg-white border-neutral-300 text-neutral-900'}`;
</script>

<svelte:head>
	<title>Checkout - Alisee</title>
</svelte:head>

<div class="min-h-screen {currentTheme === 'dark' ? 'bg-neutral-900' : 'bg-gray-100'}">
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-3xl font-bold mb-8 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
			Finaliser la commande
		</h1>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Address and Payment Form -->
			<div class="space-y-6">
				<!-- Shipping Address -->
				<div class="p-6 rounded-lg {currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'}">
					<h2 class="text-xl font-semibold mb-4 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
						Adresse de livraison
					</h2>
					<div class="grid grid-cols-2 gap-4">
						<input type="text" placeholder="Prénom" bind:value={firstName} class={inputClass} />
						<input type="text" placeholder="Nom" bind:value={lastName} class={inputClass} />
					</div>
					<input type="text" placeholder="Adresse" bind:value={address} class="{inputClass} mt-4" />
					<div class="grid grid-cols-2 gap-4 mt-4">
						<input type="text" placeholder="Ville" bind:value={city} class={inputClass} />
						<input type="text" placeholder="Code postal" bind:value={postalCode} class={inputClass} />
					</div>
					<input type="text" placeholder="Pays" bind:value={country} class="{inputClass} mt-4" />
				</div>

				<!-- Payment Information -->
				<div class="p-6 rounded-lg {currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'}">
					<h2 class="text-xl font-semibold mb-4 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
						Informations de paiement
					</h2>
					<input type="text" placeholder="Nom sur la carte" bind:value={cardholderName} class={inputClass} />
					<input 
						type="text" 
						placeholder="Numéro de carte" 
						bind:value={cardNumber}
						oninput={(e) => {
							const target = e.target as HTMLInputElement | null;
							if (target) cardNumber = formatCardNumber(target.value);
						}}
						maxlength="19"
						class="{inputClass} mt-4" 
					/>
					<div class="grid grid-cols-2 gap-4 mt-4">
						<input 
							type="text" 
							placeholder="MM/AA" 
							bind:value={expiryDate}
							oninput={(e) => {
								const target = e.target as HTMLInputElement | null;
								if (target) expiryDate = formatExpiryDate(target.value);
							}}
							maxlength="5"
							class={inputClass} 
						/>
						<input type="text" placeholder="CVV" bind:value={cvv} maxlength="4" class={inputClass} />
					</div>
				</div>
			</div>

			<!-- Order Summary -->
			<div class="p-6 rounded-lg {currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'} h-fit">
				<h2 class="text-xl font-semibold mb-4 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
					Résumé de la commande
				</h2>
				<div class="space-y-3 mb-4">
					{#each $cartStore as item}
						<div class="flex justify-between items-center">
							<div>
								<p class="font-medium {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
									{item.name} x{item.quantity}
								</p>
								{#if item.customization}
									<p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}">
										Personnalisé: {item.customization.name}
									</p>
								{/if}
							</div>
							<p class="font-semibold {currentTheme === 'dark' ? 'text-amber-400' : 'text-amber-600'}">
								{((item.price * item.quantity) / 100).toFixed(2)}€
							</p>
						</div>
					{/each}
				</div>
				<div class="border-t {currentTheme === 'dark' ? 'border-neutral-600' : 'border-neutral-300'} pt-4">
					<div class="flex justify-between items-center text-lg font-bold">
						<span class="{currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">Total:</span>
						<span class="{currentTheme === 'dark' ? 'text-amber-400' : 'text-amber-600'}">
							{(totalPrice / 100).toFixed(2)}€
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Checkout Button -->
		<div class="mt-8 text-center">
			{#if orderError}
				<div class="mb-4 p-3 rounded-lg bg-red-500 text-white">{orderError}</div>
			{/if}
			<button
				class="px-8 py-3 rounded-lg text-lg font-semibold transition-colors {isFormValid && !isProcessingOrder
					? 'bg-amber-500 text-neutral-900 hover:bg-amber-600 cursor-pointer'
					: 'bg-neutral-500 text-neutral-300 cursor-not-allowed'}"
				disabled={!isFormValid || isProcessingOrder}
				onclick={handleCheckout}
			>
				{isProcessingOrder ? 'Traitement...' : 'Confirmer la commande'}
			</button>
		</div>
	</div>
</div>

{#if showOrderSummary}
	<OrderSummary 
		{firstName} {lastName} {address} {city} {postalCode} {country} {orderId}
		on:close={() => showOrderSummary = false}
	/>
{/if}
