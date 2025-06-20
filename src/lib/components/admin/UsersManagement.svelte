<script lang="ts">
    export let currentTheme: string;
    export let users: User[] = [];
    export let loading: boolean = false;

    type User = {
        id: number;
        name: string;
        surname: string;
        email: string;
        createdAt?: string;
        accountType: number;
        orderIDs: string;
    };

    async function deleteUser(userId: number) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
        
        try {
            const response = await fetch('/api/admin/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId })
            });
            
            if (response.ok) {
                users = users.filter(u => u.id !== userId);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    async function toggleUserAccountType(user: User) {
        try {
            const newAccountType = user.accountType === 0 ? 1 : 0;
            const response = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: user.id, accountType: newAccountType })
            });
            
            if (response.ok) {
                user.accountType = newAccountType;
                users = [...users]; // Trigger reactivity
            }
        } catch (error) {
            console.error('Error updating user account type:', error);
        }
    }
</script>

<div class="{currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'} rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b {currentTheme === 'dark' ? 'border-neutral-700' : 'border-gray-200'}">
        <h2 class="text-xl font-semibold {currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}">
            Gestion des Utilisateurs
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
                            Nom
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-500'} uppercase tracking-wider">
                            Email
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-500'} uppercase tracking-wider">
                            Type de compte
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-500'} uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="{currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'} divide-y {currentTheme === 'dark' ? 'divide-neutral-700' : 'divide-gray-200'}">
                    {#each users as user}
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap text-sm {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-900'}">
                                {user.id}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium {currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}">
                                {user.name} {user.surname}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm {currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-900'}">
                                {user.email}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {user.accountType === 1 
                                    ? 'bg-purple-100 text-purple-800' 
                                    : 'bg-blue-100 text-blue-800'}">
                                    {user.accountType === 1 ? 'Admin' : 'Client'}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button
                                    on:click={() => toggleUserAccountType(user)}
                                    class="px-3 py-1 rounded text-xs bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                                >
                                    {user.accountType === 1 ? 'Dégrader' : 'Promouvoir'}
                                </button>
                                <button
                                    on:click={() => deleteUser(user.id)}
                                    class="px-3 py-1 rounded text-xs bg-red-500 hover:bg-red-600 text-white transition-colors"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>
