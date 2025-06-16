<script lang="ts">
    import '../app.css';
    import { theme } from '$lib/stores/themeStore';
    import { onMount } from 'svelte';

    let { children } = $props();

    onMount(() => {
        // Initialize theme on mount
        const unsubscribe = theme.subscribe(currentTheme => {
            if (currentTheme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            }
        });

        return unsubscribe;
    });
</script>

<div class="min-h-screen bg-black dark:bg-black light:bg-white transition-colors duration-300">
    {@render children()}
</div>
