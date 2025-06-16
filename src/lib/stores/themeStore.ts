import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let initialTheme = 'dark';

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
  const savedTheme = localStorage.getItem('theme') || initialTheme;
  theme.set(savedTheme);
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
}