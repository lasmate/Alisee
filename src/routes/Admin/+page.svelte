<script lang="ts">
    import { onMount } from 'svelte';
    import { theme } from '$lib/stores/themeStore';
    import { browser } from '$app/environment';
    import ProductsManagement from '$lib/components/admin/ProductsManagement.svelte';
    import UsersManagement from '$lib/components/admin/UsersManagement.svelte';
    import OrdersManagement from '$lib/components/admin/OrdersManagement.svelte';

    type Product = {
        id: number;
        name: string;
        description: string;
        image: string;
        size?: string;
        price: number;
        quantity: number;
        category: string;
        tags: string;
        isAvailable: number;
        isCustomisable: number;
    };

    type User = {
        id: number;
        name: string;
        surname: string;
        email: string;
        createdAt?: string;
        accountType: number;
        orderIDs: string;
    };

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

    let currentTheme = browser ? localStorage.getItem('theme') || 'dark' : 'dark';
    let activeSection: 'menu' | 'products' | 'users' | 'orders' = 'menu';
    
    let products: Product[] = [];
    let users: User[] = [];
    let orders: Order[] = [];
    
    let loading = false;

    const unsubscribe = theme.subscribe((themeValue) => {
        currentTheme = themeValue;
    });

    onMount(() => {
        currentTheme = $theme;
        return () => unsubscribe();
    });

    async function loadProducts() {
        loading = true;
        try {
            const response = await fetch('/api/admin/products');
            products = await response.json();
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            loading = false;
        }
    }

    async function loadUsers() {
        loading = true;
        try {
            const response = await fetch('/api/admin/users');
            users = await response.json();
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            loading = false;
        }
    }

    async function loadOrders() {
        loading = true;
        try {
            const response = await fetch('/api/admin/orders');
            orders = await response.json();
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            loading = false;
        }
    }

    function navigateToSection(section: typeof activeSection) {
        activeSection = section;
        if (section === 'products') loadProducts();
        else if (section === 'users') loadUsers();
        else if (section === 'orders') loadOrders();
    }
</script>

<div class="min-h-screen {currentTheme === 'dark' ? 'bg-neutral-900' : 'bg-gray-50'}">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8 {currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}">
            Administration
        </h1>

        {#if activeSection === 'menu'}
            <!-- Main Menu -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    on:click={() => navigateToSection('products')}
                    class="p-8 rounded-lg border-2 border-dashed transition-all hover:scale-105 {currentTheme === 'dark' 
                        ? 'border-neutral-600 bg-neutral-800 hover:border-amber-500 text-white' 
                        : 'border-gray-300 bg-white hover:border-amber-500 text-gray-900'}"
                >
                    <div class="text-center">
                        <div class="text-4xl mb-4">📦</div>
                        <h2 class="text-xl font-semibold mb-2">Gestion Produits</h2>
                        <p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}">
                            Gérer la disponibilité des produits
                        </p>
                    </div>
                </button>

                <button
                    on:click={() => navigateToSection('orders')}
                    class="p-8 rounded-lg border-2 border-dashed transition-all hover:scale-105 {currentTheme === 'dark' 
                        ? 'border-neutral-600 bg-neutral-800 hover:border-amber-500 text-white' 
                        : 'border-gray-300 bg-white hover:border-amber-500 text-gray-900'}"
                >
                    <div class="text-center">
                        <div class="text-4xl mb-4">📋</div>
                        <h2 class="text-xl font-semibold mb-2">Gestion Commandes</h2>
                        <p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}">
                            Voir et gérer les commandes
                        </p>
                    </div>
                </button>

                <button
                    on:click={() => navigateToSection('users')}
                    class="p-8 rounded-lg border-2 border-dashed transition-all hover:scale-105 {currentTheme === 'dark' 
                        ? 'border-neutral-600 bg-neutral-800 hover:border-amber-500 text-white' 
                        : 'border-gray-300 bg-white hover:border-amber-500 text-gray-900'}"
                >
                    <div class="text-center">
                        <div class="text-4xl mb-4">👥</div>
                        <h2 class="text-xl font-semibold mb-2">Gestion Utilisateurs</h2>
                        <p class="text-sm {currentTheme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}">
                            Gérer les comptes utilisateurs
                        </p>
                    </div>
                </button>
            </div>
        {:else}
            <!-- Back to Menu Button -->
            <button
                on:click={() => navigateToSection('menu')}
                class="mb-6 px-4 py-2 rounded-lg {currentTheme === 'dark' 
                    ? 'bg-neutral-700 hover:bg-neutral-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'} transition-colors"
            >
                ← Retour au menu
            </button>            {#if loading}
                <div class="flex justify-center items-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 {currentTheme === 'dark' ? 'border-white' : 'border-gray-900'}"></div>
                </div>
            {:else if activeSection === 'products'}
                <ProductsManagement {currentTheme} bind:products {loading} />
            {:else if activeSection === 'users'}
                <UsersManagement {currentTheme} bind:users {loading} />
            {:else if activeSection === 'orders'}
                <OrdersManagement {currentTheme} {orders} {loading} />
            {/if}
        {/if}
    </div>
</div>