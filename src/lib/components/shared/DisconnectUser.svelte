<script lang="ts">
	import { userStore } from '$lib/stores/userStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let isLoading = $state(false);
	let errorMessage = $state<string | null>(null);

	async function handleLogout() {
		isLoading = true;
		errorMessage = null;

		try {
			const response = await fetch('/api/account/disconnect', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				userStore.logout();
				dispatch('logoutSuccess');
				window.location.reload();
			} else {
				const errorData = await response.json();
				errorMessage = errorData.error || 'Erreur de déconnexion';
			}
		} catch (error) {
			errorMessage = 'Erreur de réseau. Veuillez réessayer.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex flex-col items-center justify-center p-4">
	<div class="w-full max-w-md">
		<p class="mb-4 text-lg font-semibold text-white">Bienvenue, {$userStore?.name}!</p>
		
		{#if errorMessage}
			<div class="mb-4 rounded bg-red-500 p-3 text-white">
				{errorMessage}
			</div>
		{/if}

		<button
			onclick={handleLogout}
			class="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
			disabled={isLoading}
		>
			{isLoading ? 'Déconnexion...' : 'Se déconnecter'}
		</button>
	</div>
</div>
