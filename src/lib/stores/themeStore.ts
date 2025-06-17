import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// CRITICAL: Read localStorage SYNCHRONOUSLY before creating the store
function getInitialTheme() {
	if (browser) {
		try {
			return localStorage.getItem('theme') || 'dark';
		} catch {
			return 'dark';
		}
	}
	return 'dark';
}

const initialTheme = getInitialTheme();

export const theme = writable(initialTheme);

export function toggleTheme() {
	theme.update((currentTheme) => {
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		if (browser) {
			localStorage.setItem('theme', newTheme);
			if (newTheme === 'dark') {
				document.documentElement.classList.add('dark');
				document.documentElement.classList.remove('light');
			} else {
				document.documentElement.classList.remove('dark');
				document.documentElement.classList.add('light');
			}
		}
		return newTheme;
	});
}

// Apply initial theme class immediately
if (browser) {
	if (initialTheme === 'dark') {
		document.documentElement.classList.add('dark');
		document.documentElement.classList.remove('light');
	} else {
		document.documentElement.classList.remove('dark');
		document.documentElement.classList.add('light');
	}
}
