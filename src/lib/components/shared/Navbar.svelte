<!-- Module de barre de navigation -->
<script lang="ts">
	import { theme, toggleTheme } from '$lib/stores/themeStore';
	import { userStore } from '$lib/stores/userStore';
	import { cartStore } from '$lib/stores/cartStore';
	import UserPopover from './UserPopover.svelte';
	import CartPopover from './CartPopover.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let showPopover = false;
	let showCartPopover = false;

	// start with a safe default
	let currentTheme = 'dark';
	let mounted = false;

	const unsubscribe = theme.subscribe((value) => {
		// only react to store changes after we're mounted
		if (mounted) {
			currentTheme = value;
		}
	});

	onMount(() => {
		mounted = true;
		// read the saved theme before first render
		const saved = browser ? localStorage.getItem('theme') : null;
		currentTheme = saved || 'dark';
		// push it into the store so everything stays in sync
		theme.set(currentTheme);
		return () => unsubscribe();
	});
	// Define icon sources based on the current theme
	$: iconSrc =
		currentTheme === 'dark'
			? '/img/Icon/light_mode_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg'
			: '/img/Icon/dark_mode_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg';

	$: highContrastSrc =
		currentTheme === 'dark'
			? '/img/Icon/toggle_off_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg'
			: '/img/Icon/toggle_on_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg';

	$: cartIconSrc =
		currentTheme === 'dark'
			? '/img/Icon/shopping_cart_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg'
			: '/img/Icon/shopping_cart_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg';

	$: accountIconSrc =
		currentTheme === 'dark'
			? '/img/Icon/account_circle_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg'
			: '/img/Icon/account_circle_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg';

	$: totalItems = cartStore.getTotalItems($cartStore);
</script>

{#if mounted}<!-- Ensure the component is mounted before rendering  to prevent style mismatches between icons and backgrounds -->
	<div class="sticky z-10 flex flex-row place-content-around rounded-b-3xl text-white">
		<div
			class="flex h-10 basis-1/8 items-center justify-center rounded-bl-3xl border-1 text-center md:basis-1/8 {currentTheme ===
			'dark'
				? 'border-white bg-neutral-900'
				: 'border-neutral-900 bg-white'} transition-colors duration-300"
		>
			<button
				class="flex h-full w-full items-center justify-center"
				on:click={() => (window.location.href = '/')}
				><img src={highContrastSrc} alt="HighContrastToggle" class="inline-block h-8 w-8" />
			</button>
		</div>
		<div
			class="flex h-10 basis-1/8 items-center justify-center border-1 text-center md:basis-1/4 {currentTheme ===
			'dark'
				? 'border-white bg-neutral-900'
				: 'border-neutral-900 bg-white'} transition-colors duration-300"
		>
			<button
				class="flex h-full w-full items-center justify-center"
				on:click={() => (showCartPopover = true)}
			>
				<div class="relative">
					<img src={cartIconSrc} alt="Cart" class="inline-block h-8 w-8" />
					{#if totalItems > 0}
						<span
							class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
						>
							{totalItems > 99 ? '99+' : totalItems}
						</span>
					{/if}
				</div>
			</button>
		</div>
		<div
			class="h-20 basis-4/8 rounded-b-3xl border-1 bg-[url('/img/silusins.png')] bg-contain bg-top bg-no-repeat bg-origin-border md:basis-1/4 {currentTheme ===
			'dark'
				? 'border-white bg-neutral-900'
				: 'border-neutral-900 bg-white'} transition-colors duration-300"
		></div>
		<div
			class="flex h-10 basis-1/8 items-center justify-center border-1 text-center md:basis-1/4 {currentTheme ===
			'dark'
				? 'border-white bg-neutral-900'
				: 'border-neutral-900 bg-white'} transition-colors duration-300"
		>
			<button
				class="flex h-full w-full items-center justify-center gap-2 px-2"
				on:click={() => (showPopover = true)}
			>
				{#if $userStore}
					<!-- Show user name when logged in -->
					<span
						class="text-xs font-bold {currentTheme === 'dark'
							? 'text-white'
							: 'text-neutral-900'} max-w-20 truncate"
					>
						{$userStore.name}
					</span>
				{/if}
				<img
					src={accountIconSrc}
					alt="Account profile"
					class="inline-block h-8 w-8 flex-shrink-0"
				/>
			</button>
		</div>
		<div
			class="flex h-10 basis-1/8 items-center justify-center rounded-br-3xl border-1 text-center md:basis-1/8 {currentTheme ===
			'dark'
				? 'border-white bg-neutral-900'
				: 'border-neutral-900 bg-white'} transition-colors duration-300"
		>
			<button class="flex h-full w-full items-center justify-center" on:click={toggleTheme}>
				<img src={iconSrc} alt="Toggle theme" class="inline-block h-8 w-8" />
			</button>
		</div>
	</div>
{/if}
<!-- End of Navbar component -->
{#if showPopover}
	<UserPopover on:close={() => (showPopover = false)} />
{/if}
{#if showCartPopover}
	<CartPopover 
		on:close={() => (showCartPopover = false)} 
		on:openUserPopover={() => {
			showCartPopover = false;
			showPopover = true;
		}}
	/>
{/if}
