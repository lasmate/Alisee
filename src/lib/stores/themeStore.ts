import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Determine initial theme from localStorage or system preference
let initialTheme = 'light';
if (browser) {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    initialTheme = storedTheme;
  } else {
    initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

export const theme = writable(initialTheme);

export function toggleTheme() {
  theme.update(currentTheme => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (browser) {
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    return newTheme;
  });
}

// Apply initial theme class to HTML element on load
if (browser) {
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}