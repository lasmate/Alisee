<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/themeStore';
	import { userStore } from '$lib/stores/userStore';
	import { cartStore } from '$lib/stores/cartStore';
	import { goto } from '$app/navigation';
	import OrderSummary from '$lib/components/shared/OrderSummary.svelte';

	let currentTheme = browser ? localStorage.getItem('theme') || 'dark' : 'dark';
	const unsubscribe = theme.subscribe((themeValue) => (currentTheme = themeValue));

	let showOrderSummary = false;
	let mounted = false;

	// Form data
	let firstName = '';
	let lastName = '';
	let address = '';
	let city = '';
	let postalCode = '';
	let country = '';
	let cardNumber = '';
	let expiryDate = '';
	let cvv = '';
	let cardholderName = '';

	$: isFormValid = firstName.trim() !== '' &&
		lastName.trim() !== '' &&
		address.trim() !== '' &&
		city.trim() !== '' &&
		postalCode.trim() !== '' &&
		country.trim() !== '' &&
		cardNumber.trim() !== '' &&
		expiryDate.trim() !== '' &&
		cvv.trim() !== '' &&
		cardholderName.trim() !== '';

	$: totalPrice = cartStore.getTotalPrice($cartStore);

	// Only check redirects after component is mounted and stores are loaded
	$: if (mounted) {
		if (!$userStore) {
			goto('/');
		} else if ($cartStore.length === 0) {
			goto('/');
		}
	}

	onMount(() => {
		// Small delay to ensure stores are loaded
		setTimeout(() => {
			mounted = true;
		}, 100);
	});

	let isProcessingOrder = false;
	let orderError = '';
	let orderId = '';

	async function handleCheckout() {
		if (!isFormValid) return;
		
		isProcessingOrder = true;
		orderError = '';

		try {
			const orderData = {
				firstName,
				lastName,
				address,
				city,
				postalCode,
				country,
				totalPrice,
				items: $cartStore
			};

			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(orderData)
			});

			const result = await response.json();

			if (response.ok) {
				// Store the order ID for the summary
				orderId = result.orderId.toString();
				// Order created successfully, show summary
				showOrderSummary = true;
			} else {
				orderError = result.error || 'Erreur lors de la création de la commande';
			}
		} catch (error) {
			orderError = 'Erreur de connexion. Veuillez réessayer.';
		} finally {
			isProcessingOrder = false;
		}
	}

	function formatCardNumber(value: string) {
		return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
	}

	function formatExpiryDate(value: string) {
		return value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
	}
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
						<input
							type="text"
							placeholder="Prénom"
							bind:value={firstName}
							class="w-full px-3 py-2 border rounded-lg {currentTheme === 'dark' 
								? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
								: 'bg-white border-neutral-300 text-neutral-900'}"
						/>
						<input
							type="text"
							placeholder="Nom"
							bind:value={lastName}
							class="w-full px-3 py-2 border rounded-lg {currentTheme === 'dark' 
								? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
								: 'bg-white border-neutral-300 text-neutral-900'}"
						/>
					</div>
					<input
						type="text"
						placeholder="Adresse"
						bind:value={address}
						class="w-full px-3 py-2 border rounded-lg mt-4 {currentTheme === 'dark' 
							? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
							: 'bg-white border-neutral-300 text-neutral-900'}"
					/>
					<div class="grid grid-cols-2 gap-4 mt-4">
						<input
							type="text"
							placeholder="Ville"
							bind:value={city}
							class="w-full px-3 py-2 border rounded-lg {currentTheme === 'dark' 
								? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
								: 'bg-white border-neutral-300 text-neutral-900'}"
						/>
						<input
							type="text"
							placeholder="Code postal"
							bind:value={postalCode}
							class="w-full px-3 py-2 border rounded-lg {currentTheme === 'dark' 
								? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
								: 'bg-white border-neutral-300 text-neutral-900'}"
						/>
					</div>
					<input
						type="text"
						placeholder="Pays"
						bind:value={country}
						class="w-full px-3 py-2 border rounded-lg mt-4 {currentTheme === 'dark' 
							? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
							: 'bg-white border-neutral-300 text-neutral-900'}"
					/>
				</div>

				<!-- Payment Information -->
				<div class="p-6 rounded-lg {currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'}">
					<h2 class="text-xl font-semibold mb-4 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
						Informations de paiement
					</h2>
					<input
						type="text"
						placeholder="Nom sur la carte"
						bind:value={cardholderName}
						class="w-full px-3 py-2 border rounded-lg {currentTheme === 'dark' 
							? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
							: 'bg-white border-neutral-300 text-neutral-900'}"
					/>
					<input
						type="text"
						placeholder="Numéro de carte"
						bind:value={cardNumber}
						on:input={(e) => {
							const target = e.target as HTMLInputElement | null;
							if (target) cardNumber = formatCardNumber(target.value);
						}}
						maxlength="19"
						class="w-full px-3 py-2 border rounded-lg mt-4 {currentTheme === 'dark' 
							? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
							: 'bg-white border-neutral-300 text-neutral-900'}"
					/>
					<div class="grid grid-cols-2 gap-4 mt-4">
						<input
							type="text"
							placeholder="MM/AA"
							bind:value={expiryDate}
							on:input={(e) => {
								const target = e.target as HTMLInputElement | null;
								if (target) expiryDate = formatExpiryDate(target.value);
							}}
							maxlength="5"
							class="w-full px-3 py-2 border rounded-lg {currentTheme === 'dark' 
								? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
								: 'bg-white border-neutral-300 text-neutral-900'}"
						/>
						<input
							type="text"
							placeholder="CVV"
							bind:value={cvv}
							maxlength="4"
							class="w-full px-3 py-2 border rounded-lg {currentTheme === 'dark' 
								? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
								: 'bg-white border-neutral-300 text-neutral-900'}"
						/>
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
								${(item.price * item.quantity).toFixed(2)}
							</p>
						</div>
					{/each}
				</div>
				<div class="border-t {currentTheme === 'dark' ? 'border-neutral-600' : 'border-neutral-300'} pt-4">
					<div class="flex justify-between items-center text-lg font-bold">
						<span class="{currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">Total:</span>
						<span class="{currentTheme === 'dark' ? 'text-amber-400' : 'text-amber-600'}">
							${totalPrice.toFixed(2)}
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Checkout Button -->
		<div class="mt-8 text-center">
			{#if orderError}
				<div class="mb-4 p-3 rounded-lg bg-red-500 text-white">
					{orderError}
				</div>
			{/if}
			<button
				class="px-8 py-3 rounded-lg text-lg font-semibold transition-colors {isFormValid && !isProcessingOrder
					? 'bg-amber-500 text-neutral-900 hover:bg-amber-600 cursor-pointer'
					: 'bg-neutral-500 text-neutral-300 cursor-not-allowed'}"
				disabled={!isFormValid || isProcessingOrder}
				on:click={handleCheckout}
			>
				{isProcessingOrder ? 'Traitement...' : 'Confirmer la commande'}
			</button>
		</div>
	</div>
</div>

{#if showOrderSummary}
	<OrderSummary 
		{firstName}
		{lastName}
		{address}
		{city}
		{postalCode}
		{country}
		orderId={orderId}
		on:close={() => showOrderSummary = false}
	/>
{/if}
