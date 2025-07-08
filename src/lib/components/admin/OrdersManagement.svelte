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
		userId: number;
		firstName: string;
		lastName: string;
		address: string;
		city: string;
		postalCode: string;
		country: string;
		totalPrice: number;
		items: any[];
		status: string;
		createdAt: string;
		processedAt?: string;
		shippedAt?: string;

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

	async function updateOrderStatus(orderId: number, newStatus: string) {
		try {
			const response = await fetch('/api/admin/orders', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: orderId, status: newStatus })
			});

			if (response.ok) {
				const orderIndex = orders.findIndex(o => o.orderId === orderId);
				if (orderIndex >= 0) {
					orders[orderIndex].status = newStatus;
					orders[orderIndex].isCompleted = newStatus === 'completed';
					orders = [...orders]; // Trigger reactivity
				}
			}
		} catch (error) {
			console.error('Error updating order status:', error);
		}
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('fr-FR');
	}

	function getTotalItems(items: any[]) {
		return items.reduce((total, item) => total + (item.quantity || 1), 0);
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
			: 'bg-gray-100'} max-w-[95vw] max-h-[90vh] overflow-auto rounded-lg p-6"
	>
		<h2 class="text-2xl font-bold mb-6 {currentTheme === 'dark' ? 'text-white' : 'text-neutral-900'}">
			Gestion des Commandes
		</h2>

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
							<th
								class="px-3 py-3 text-left text-xs font-medium {currentTheme === 'dark'
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
						{#each orders as order}
							<tr>
								<td
									class="px-3 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									#{order.orderId}
								</td>
								<td
									class="px-3 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									<div class="font-medium">{order.firstName} {order.lastName}</div>
									<div class="text-xs {currentTheme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}">
										{order.address}, {order.city}
									</div>
								</td>
								<td
									class="px-3 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{getTotalItems(order.items)} article{getTotalItems(order.items) > 1 ? 's' : ''}
								</td>
								<td
									class="px-3 py-4 text-sm font-semibold whitespace-nowrap {currentTheme === 'dark'
										? 'text-amber-400'
										: 'text-amber-600'}"
								>
									${order.totalPrice.toFixed(2)}
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
										class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold {order.status === 'completed'
											? 'bg-green-100 text-green-800'
											: order.status === 'processing'
											? 'bg-blue-100 text-blue-800'
											: order.status === 'shipped'
											? 'bg-purple-100 text-purple-800'
											: 'bg-yellow-100 text-yellow-800'}"
									>
										{order.status === 'pending' ? 'En attente' : 
										 order.status === 'processing' ? 'En cours' :
										 order.status === 'shipped' ? 'Expédiée' : 'Terminée'}
									</span>
								</td>
								<td class="px-3 py-4 text-sm font-medium whitespace-nowrap">
									<div class="flex gap-1">
										{#if order.status === 'pending'}
											<button
												on:click={() => updateOrderStatus(order.orderId, 'processing')}
												class="rounded bg-blue-500 px-2 py-1 text-xs text-white transition-colors hover:bg-blue-600"
											>
												Traiter
											</button>
										{:else if order.status === 'processing'}
											<button
												on:click={() => updateOrderStatus(order.orderId, 'shipped')}
												class="rounded bg-purple-500 px-2 py-1 text-xs text-white transition-colors hover:bg-purple-600"
											>
												Expédier
											</button>
										{:else if order.status === 'shipped'}
											<button
												on:click={() => updateOrderStatus(order.orderId, 'completed')}
												class="rounded bg-green-500 px-2 py-1 text-xs text-white transition-colors hover:bg-green-600"
											>
												Terminer
											</button>
										{/if}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>

