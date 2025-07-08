<!--
    RegisterUser.svelte

    User registration form component. Handles new user account creation with
    form validation and automatic login upon successful registration.

    Props: None.
    Events: registerSuccess (dispatched on successful registration).
    Functions: Form validation, API communication, user store management.
-->
<script lang="ts">
	import { userStore } from '$lib/stores/userStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let email = $state('');
	let password = $state('');
	let name = $state('');
	let surname = $state('');
	let errorMessage = $state<string | null>(null);
	let isLoading = $state(false);

	async function handleRegister() {
		isLoading = true;
		errorMessage = null;

		try {
			const response = await fetch('/api/account/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password,
					name,
					surname
				})
			});

			if (response.ok) {
				const data = await response.json();
				userStore.login(data.user);
				// Clear form
				email = '';
				password = '';
				name = '';
				surname = '';
				// Emit event to close modal
				dispatch('registerSuccess');
			} else {
				const errorData = await response.json();
				errorMessage = errorData.error || "Erreur lors de l'inscription";
			}
		} catch (error) {
			errorMessage = 'Erreur de réseau. Veuillez réessayer.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex flex-col items-center justify-center p-4">
	<form onsubmit={handleRegister} class="w-full max-w-md">
		<p class="mb-4 text-lg font-semibold text-white">Créer un compte</p>

		{#if errorMessage}
			<div class="mb-4 rounded bg-red-500 p-3 text-white">
				{errorMessage}
			</div>
		{/if}

		<input
			class="mb-2 w-full rounded border px-3 py-2 text-black"
			placeholder="Nom"
			type="text"
			bind:value={name}
			required
			disabled={isLoading}
		/>
		<input
			class="mb-2 w-full rounded border px-3 py-2 text-black"
			placeholder="Prénom"
			type="text"
			bind:value={surname}
			required
			disabled={isLoading}
		/>
		<input
			class="mb-2 w-full rounded border px-3 py-2 text-black"
			placeholder="Email"
			type="email"
			bind:value={email}
			required
			disabled={isLoading}
		/>
		<input
			class="mb-4 w-full rounded border px-3 py-2 text-black"
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
			{isLoading ? 'Création...' : 'Créer le compte'}
		</button>
	</form>
</div>
