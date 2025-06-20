<script lang="ts">
    export let currentTheme: string;
    export let orders: Order[] = [];
    export let loading: boolean = false;

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

    function formatPrice(price: number) {
        return (price / 100).toFixed(2);
    }

    function formatDate(dateString?: string) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('fr-FR');
    }
</script>

<div class="{currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'} rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b {currentTheme === 'dark' ? 'border-neutral-700' : 'border-gray-200'}">
        <h2 class="text-xl font-semibold {currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}">
            Gestion des Commandes
        </h2>
    </div>
    
    {#if loading}
        <div class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 {currentTheme === 'dark' ? 'border-white' : 'border-gray-900'}"></div>
        </div>
    {:else}
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead class="{currentTheme === 'dark' ? 'bg-neutral-700' : 'bg-gray-50'}">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-500'} uppercase tracking-wider">
                            ID
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-500'} uppercase tracking-wider">
                            Client
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-500'} uppercase tracking-wider">
                            Produit
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-500'} uppercase tracking-wider">
                            Prix
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-500'} uppercase tracking-wider">
                            Date
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-500'} uppercase tracking-wider">
                            Statut
                        </th>
                    </tr>
                </thead>
                <tbody class="{currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'} divide-y {currentTheme === 'dark' ? 'divide-neutral-700' : 'divide-gray-200'}">
                    {#each orders as order}
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap text-sm {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-900'}">
                                {order.orderId}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-900'}">
                                {order.userName} {order.userSurname}
                                <div class="text-xs {currentTheme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}">
                                    {order.userEmail}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-900'}">
                                {order.itemName || 'N/A'}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-900'}">
                                {order.price ? '$' + formatPrice(order.price) : 'N/A'}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-900'}">
                                {formatDate(order.createdAt)}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {order.isCompleted 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'}">
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
