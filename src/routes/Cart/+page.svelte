<script lang="ts">
    import type { PageData } from './$types';
    import { cart } from '$lib/stores/cart';

    let { data }: { data: PageData } = $props();
</script>

<div class="max-w-4xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>
    
    {#if $cart.length === 0}
        <div class="text-center py-12">
            <p class="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <a 
                href="/" 
                class="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Continue Shopping
            </a>
        </div>
    {:else}
        <div class="space-y-4 mb-8">
            {#each $cart as item (item.id)}
                <div class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                    {#if item.image}
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            class="w-20 h-20 object-cover rounded-md"
                        />
                    {/if}
                    
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold mb-1">{item.name}</h3>
                        <p class="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <button 
                            onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                            class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                            -
                        </button>
                        <span class="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                            onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                            class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                            +
                        </button>
                    </div>
                    
                    <div class="text-lg font-bold min-w-20 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    
                    <button 
                        onclick={() => cart.removeItem(item.id)}
                        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        Remove
                    </button>
                </div>
            {/each}
        </div>
        
        <div class="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <div class="text-xl font-bold mb-4">
                Total: ${cart.getTotalPrice($cart).toFixed(2)}
            </div>
            <div class="flex gap-4 justify-end">
                <button 
                    onclick={() => cart.clear()} 
                    class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Clear Cart
                </button>
                <button 
                    class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    {/if}
</div>