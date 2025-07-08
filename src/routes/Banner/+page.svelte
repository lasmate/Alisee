<script lang="ts">
import { Motion,useMotionTemplate, useMotionValue } from 'svelte-motion';
import {theme} from '$lib/stores/themeStore';
import {browser} from '$app/environment';


//derived state for theme
	let currentTheme = $derived(browser ? $theme : 'dark');

	let mouseX = useMotionValue(0);
	let mouseY = useMotionValue(0);
	let background = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(60, 60, 60, 0.4), transparent 80%)`;


</script>



<div 
    role="region"
    onmousemove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    }}

    class=" relative w-[90vw] max-w-[1200px] mx-auto overflow-hidden rounded-xl {currentTheme === 'dark' 
    ? 'bg-neutral-900' 
    : 'bg-white'} transition-colors duration-400"
    >
    <div
		class="absolute top-0 right-5 h-px w-80 bg-gradient-to-l from-transparent {currentTheme ===
		'dark'
			? 'via-white/30'
			: 'via-black/30'} via-10% to-transparent"
	></div>
    <Motion style={{ background }} let:motion>
        <div
            use:motion
            class="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300
            group-hover:opacity-100"
        ></div>
    </Motion>
    <div
		class="relative flex flex-col gap-3 rounded-xl border {currentTheme === 'dark'
			? 'border-white/10'
			: 'border-black/10'} px-4 py-5"
        >
        <h1 class="text-2xl font-bold {currentTheme === 'dark'
            ? 'text-neutral-200'
            : 'text-neutral-800'}"
            >
            Bienvenue sur Alisee</h1>
        <p class="text-lg {currentTheme === 'dark'
            ? 'text-neutral-200'
            : 'text-neutral-800'}"
            >
            Votre boutique en ligne pour les produits artisanaux</p>
    </div>

</div>