<script lang="ts">
	import '../app.css';
	import { theme } from '$lib/stores/themeStore';
	import { userStore } from '$lib/stores/userStore';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		// Initialize theme on mount
		const unsubscribe = theme.subscribe((currentTheme) => {
			if (currentTheme === 'dark') {
				document.documentElement.classList.add('dark');
				document.documentElement.classList.remove('light');
			} else {
				document.documentElement.classList.remove('dark');
				document.documentElement.classList.add('light');
			}
		});

		// Initialize user store from sessionStorage
		userStore.init();

		return unsubscribe;
	});
</script>

<div>
	{@render children()}
</div>
