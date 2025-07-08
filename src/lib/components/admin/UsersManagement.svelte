<!--
    UsersManagement.svelte

    Admin component to manage users. Displays a table with user details
    (ID, name, email, account type) and allows user deletion and role management.

    Props: currentTheme (string).
    Events: close (dispatched on modal close).
    Functions: User deletion, account type toggling, data fetching.
-->
<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	const { currentTheme } = $props<{ currentTheme: string }>();
	let users = $state<User[]>([]);
	let loading = $state(false);

	type User = {
		id: number;
		name: string;
		surname: string;
		email: string;
		createdAt?: string;
		accountType: number;
		orderIDs: string;
	};

	onMount(async () => {
		loading = true;
		try {
			const res = await fetch('/api/admin/users');
			if (res.ok) {
				users = await res.json();
			}
		} catch (e) {
			console.error('Failed to fetch users', e);
		} finally {
			loading = false;
		}
	});

	async function deleteUser(userId: number) {
		if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

		try {
			const response = await fetch('/api/admin/users', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: userId })
			});

			if (response.ok) {
				users = users.filter((u) => u.id !== userId);
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

<div class="fixed inset-0 z-15 flex items-center justify-center">
	<div
		class="absolute inset-0 bg-black/50"
		role="button"
		tabindex="0"
		onclick={() => dispatch('close')}
		onkeydown={(e) => e.key === 'Escape' && dispatch('close')}
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
								Nom
							</th>
							<th
								class="px-3 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Email
							</th>
							<th
								class="px-3 py-3 text-left text-xs font-medium {currentTheme === 'dark'
									? 'text-neutral-300'
									: 'text-gray-500'} tracking-wider uppercase"
							>
								Type de compte
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
						{#each users as user}
							<tr>
								<td
									class="px-3 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{user.id}
								</td>
								<td
									class="px-3 py-4 text-sm font-medium whitespace-nowrap {currentTheme === 'dark'
										? 'text-white'
										: 'text-gray-900'}"
								>
									{user.name}
									{user.surname}
								</td>
								<td
									class="px-3 py-4 text-sm whitespace-nowrap {currentTheme === 'dark'
										? 'text-neutral-300'
										: 'text-gray-900'}"
								>
									{user.email}
								</td>
								<td class="px-3 py-4 whitespace-nowrap">
									<span
										class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold {user.accountType ===
										1
											? 'bg-purple-100 text-purple-800'
											: 'bg-blue-100 text-blue-800'}"
									>
										{user.accountType === 1 ? 'Admin' : 'Client'}
									</span>
								</td>
								<td class="space-x-2 px-3 py-4 text-sm font-medium whitespace-nowrap">
									<button
										onclick={() => toggleUserAccountType(user)}
										class="rounded bg-blue-500 px-3 py-1 text-xs text-white transition-colors hover:bg-blue-600"
									>
										{user.accountType === 1 ? 'Dégrader' : 'Promouvoir'}
									</button>
									<button
										onclick={() => deleteUser(user.id)}
										class="rounded bg-red-500 px-3 py-1 text-xs text-white transition-colors hover:bg-red-600"
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
</div>
