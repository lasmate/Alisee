<!--
    OrdersManagement.svelte

    Admin component to manage orders. Displays a table with order details
    (ID, client, product, price, date, status) and allows updating order status.

    Props: currentTheme (string).
    Events: close (dispatched on modal close).
    Functions: toggleOrderStatus, formatPrice.
-->
<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let currentTheme: string;
	let orders: Order[] = [];
	let loading: boolean = false;

	type Order = {
		orderId: number;
		itemId?: number;
		itemName?: string;
		userId?: number;
		userName?: string;
		userSurname?: string;
		userEmail?: string;
		createdAt?: string;
		processedAt?: string;
		shippedAt?: string;
		shippingAddress?: string;
		price?: number;
		isCompleted?: boolean;
	};

	onMount(async () => {
		loading = true;
		try {
			const res = await fetch('/api/admin/orders');
			if (res.ok) {
				orders = await res.json();
			}
		} catch (e) {
			console.error('Failed to fetch orders', e);
		} finally {
			loading = false;
		}
	});

	function formatPrice(price: number) {
		return (price / 100).toFixed(2);
	}

	function formatDate(dateString?: string) {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleDateString('fr-FR');
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
								class="px-3 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								ID
							</th>
							<th
								class="px-3 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Client
							</th>
							<th
								class="px-3 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Produit
							</th>
							<th
								class="px-3 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Prix
							</th>
							<th
								class="px-3 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Date
							</th>
							<th
								class="px-3 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Statut
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
						{#each orders as order}
							<tr>
								<td
									class="px-3 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{order.orderId}
								</td>
								<td
									class="px-3 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{order.userName}
									{order.userSurname}
									<div
										class="text-xs {currentTheme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}"
									>
										{order.userEmail}
									</div>
								</td>
								<td
									class="px-3 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{order.itemName || 'N/A'}
								</td>
								<td
									class="px-3 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{order.price ? '$' + formatPrice(order.price) : 'N/A'}
								</td>
								<td
									class="px-3 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{formatDate(order.createdAt)}
								</td>
								<td class="px-3 py-4 whitespace-nowrap">
									<span
										class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold {order.isCompleted
											? 'bg-green-100 text-green-800'
											: 'bg-yellow-100 text-yellow-800'}"
									>
										{order.isCompleted ? 'Terminée' : 'En cours'}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
