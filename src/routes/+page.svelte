<script lang="ts">
	import { theme } from '$lib/stores/themeStore';
	import { userStore } from '$lib/stores/userStore';
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import Grid from './Grid/+page.svelte';
	import Banner from './Banner/+page.svelte';
	// reactive theme value
	$: currentTheme = $theme;
</script>

<div
	class="transition-colors duration-300 {currentTheme === 'dark' ? 'bg-black' : 'bg-white'}"
	style="background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cg fill=\'%23e19b17\' fill-opacity=\'0.45\'%3E%3Cpolygon fill-rule=\'evenodd\' points=\'8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4\'/%3E%3C/g%3E%3C/svg%3E');"
>
	<Navbar />
	<Banner />
	<Grid />

	<!-- Admin Access Button -->
	{#if $userStore && $userStore.accountType === 1}
		<div class="fixed right-4 bottom-4 z-10">
			<a
				href="/Admin"
				class="inline-flex items-center rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 {currentTheme ===
				'dark'
					? 'border border-neutral-600 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
					: 'border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'} 
			opacity-60 shadow-lg hover:opacity-100 hover:shadow-xl"
				title="Accès Administration"
			>
				<svg
					class="mr-1 h-3 w-3"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
						clip-rule="evenodd"
					></path>
				</svg>
				Admin
			</a>
		</div>
	{/if}
</div>
