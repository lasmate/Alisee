<!--
    UserPopover.svelte

    User authentication popover component. Shows login/register options for guests
    and disconnect option for authenticated users.

    Props: None.
    Events: close (dispatched on modal close).
    Functions: User authentication state management, modal navigation.
-->
<script lang="ts">
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/stores/themeStore';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import DisconnectUser from './DisconnectUser.svelte';
	import RegisterUser from './RegisterUser.svelte';
	import ConnectUser from './ConnectUser.svelte';
	import { createEventDispatcher } from 'svelte';
	import { userStore } from '$lib/stores/userStore';

	let currentTheme = $state(browser ? localStorage.getItem('theme') || 'dark' : 'dark');
	const unsubscribe = theme.subscribe((themeValue) => (currentTheme = themeValue));

	let showRegister = $state(false);
	let showConnect = $state(false);

	const dispatch = createEventDispatcher();

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="fixed inset-0 z-15 flex items-center justify-center">
	<div
		class="absolute inset-0 bg-black/50"
		role="button"
		tabindex="0"
		onclick={() => {
			showRegister = false;
			showConnect = false;
			dispatch('close');
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				showRegister = false;
				showConnect = false;
				dispatch('close');
			}
		}}
	></div>

	<div
		in:fly={{ y: 200, duration: 300 }}
		out:fly={{ y: 200, duration: 300 }}
		class="relative {currentTheme === 'dark'
			? 'bg-neutral-900'
			: 'bg-gray-100'} max-w-[90vw] min-w-[320px] overflow-auto rounded-lg p-6"
	>
		{#if $userStore}
			<!-- Connected: show disconnect module -->
			<DisconnectUser />
		{:else}
			<!-- Not connected: show register/connect buttons -->
			<div class="flex flex-col items-center justify-center gap-4">
				<button
					class="w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-amber-600 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:outline-none"
					onclick={() => {
						showRegister = true;
					}}
				>
					Créer un compte
				</button>
				<button
					class="w-full rounded-lg {currentTheme === 'dark'
						? 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
						: 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'} px-4 py-2 text-sm font-semibold transition-colors focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:outline-none"
					onclick={() => {
						showConnect = true;
					}}
				>
					Se connecter
				</button>
			</div>
			{#if showRegister}
				<div class="fixed inset-0 z-20 flex items-center justify-center">
					<div
						class="absolute inset-0 bg-black/50"
						role="button"
						tabindex="0"
						onclick={() => (showRegister = false)}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								showRegister = false;
							}
						}}
					></div>
					<div
						in:fly={{ y: 200, duration: 300 }}
						out:fly={{ y: 200, duration: 300 }}
						class="relative rounded-lg p-6 {currentTheme === 'dark'
							? 'bg-neutral-900'
							: 'bg-gray-100'}"
					>
						<RegisterUser
							on:registerSuccess={() => {
								showRegister = false;
								location.reload();
							}}
						/>
					</div>
				</div>
			{/if}
			{#if showConnect}
				<div class="fixed inset-0 z-20 flex items-center justify-center">
					<div
						class="absolute inset-0 bg-black/50"
						role="button"
						tabindex="0"
						onclick={() => (showConnect = false)}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								showConnect = false;
							}
						}}
					></div>
					<div
						in:fly={{ y: 200, duration: 300 }}
						out:fly={{ y: 200, duration: 300 }}
						class="relative rounded-lg p-6 {currentTheme === 'dark'
							? 'bg-neutral-900'
							: 'bg-gray-100'}"
					>
						<ConnectUser
							on:loginSuccess={() => {
								showConnect = false;
								dispatch('close');
							}}
						/>
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>
