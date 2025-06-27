<script lang="ts">
    import { userStore } from '$lib/stores/userStore';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    let email: string = '';
    let password: string = '';
    let errorMessage: string | null = null;
    let isLoading: boolean = false;

    async function handleLogin() {
        isLoading = true;
        errorMessage = '';
        
        try {
            const response = await fetch("/api/account/connect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                userStore.login(data.user);
                // Clear form
                email = '';
                password = '';
                // Emit event to close modal
                dispatch('loginSuccess');
            } else {
                const errorData = await response.json();
                errorMessage = errorData.error || 'Erreur de connexion';
            }
        } catch (error) {
            errorMessage = 'Erreur de réseau. Veuillez réessayer.';
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="flex flex-col items-center justify-center p-4">
    <form on:submit|preventDefault={handleLogin} class="w-full max-w-md">
        <p class="mb-4 text-lg text-white font-semibold">Se connecter</p>
        
        {#if errorMessage}
            <div class="mb-4 p-3 bg-red-500 text-white rounded">
                {errorMessage}
            </div>
        {/if}
        
        <input 
            class="mb-2 w-full text-black rounded border px-3 py-2" 
            placeholder="Email" 
            type="email" 
            bind:value={email} 
            required 
            disabled={isLoading}
        />
        <input 
            class="mb-4 w-full text-black rounded border px-3 py-2" 
            placeholder="Mot de passe" 
            type="password" 
            bind:value={password} 
            required 
            disabled={isLoading}
        />
        <button 
            type="submit" 
            class="w-full rounded bg-amber-500 px-4 py-2 text-neutral-900 hover:bg-amber-600 disabled:opacity-50"
            disabled={isLoading}
        >
            {isLoading ? 'Connexion...' : 'Connexion'}
        </button>
    </form>
</div>