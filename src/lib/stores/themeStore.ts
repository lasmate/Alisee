import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Read from localStorage immediately if in browser, otherwise default to 'dark'
let initialTheme = 'dark';
if (browser) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    initialTheme = savedTheme;
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
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
    return newTheme;
  });
}

// Apply initial theme class to HTML element on load
if (browser) {
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
}