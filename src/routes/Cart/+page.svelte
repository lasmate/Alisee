<script lang="ts">
	import type { PageData } from './$types';
	import { cart } from '$lib/stores/cart';
</script>

<div class="mx-auto max-w-4xl p-8">
	<h1 class="mb-8 text-3xl font-bold">Shopping Cart</h1>

	{#if $cart.length === 0}
		<div class="py-12 text-center">
			<p class="mb-6 text-xl text-gray-600">Your cart is empty</p>
			<a
				href="/"
				class="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
			>
				Continue Shopping
			</a>
		</div>
	{:else}
		<div class="mb-8 space-y-4">
			{#each $cart as item (item.id)}
				<div
					class="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
				>
					{#if item.image}
						<img src={item.image} alt={item.name} class="h-20 w-20 rounded-md object-cover" />
					{/if}

					<div class="flex-1">
						<h3 class="mb-1 text-lg font-semibold">{item.name}</h3>
						<p class="text-gray-600">${item.price.toFixed(2)}</p>
					</div>

					<div class="flex items-center gap-2">
						<button
							onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}
							class="flex h-8 w-8 items-center justify-center rounded border border-gray-300 transition-colors hover:bg-gray-50"
						>
							-
						</button>
						<span class="w-8 text-center font-medium">{item.quantity}</span>
						<button
							onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}
							class="flex h-8 w-8 items-center justify-center rounded border border-gray-300 transition-colors hover:bg-gray-50"
						>
							+
						</button>
					</div>

					<div class="min-w-20 text-right text-lg font-bold">
						${(item.price * item.quantity).toFixed(2)}
					</div>

					<button
						onclick={() => cart.removeItem(item.id)}
						class="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
					>
						Remove
					</button>
				</div>
			{/each}
		</div>

		<div class="rounded-lg border border-gray-200 bg-gray-50 p-6">
			<div class="mb-4 text-xl font-bold">
				Total: ${cart.getTotalPrice($cart).toFixed(2)}
			</div>
			<div class="flex justify-end gap-4">
				<button
					onclick={() => cart.clear()}
					class="rounded-lg bg-gray-500 px-6 py-3 text-white transition-colors hover:bg-gray-600"
				>
					Clear Cart
				</button>
				<button
					class="rounded-lg bg-green-500 px-6 py-3 text-white transition-colors hover:bg-green-600"
				>
					Proceed to Checkout
				</button>
			</div>
		</div>
	{/if}
</div>
