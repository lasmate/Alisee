import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type User = {
	id: number;
	name: string;
	surname: string;
	email: string;
	accountType: number;
	createdAt?: string;
	orderIDs: string;
};

// User store to manage authentication state
function createUserStore() {
	const { subscribe, set } = writable<User | null>(null);

	return {
		subscribe,
		login: (userData: User) => {
			set(userData);
			if (browser) {
				// Store user data in sessionStorage for persistence across page reloads
				sessionStorage.setItem('user', JSON.stringify(userData));
			}
		},
		logout: () => {
			set(null);
			if (browser) {
				sessionStorage.removeItem('user');
			}
		},
		// Initialize user from sessionStorage on app start
		init: () => {
			if (browser) {
				const storedUser = sessionStorage.getItem('user');
				if (storedUser) {
					try {
						const userData = JSON.parse(storedUser);
						set(userData);
					} catch (e) {
						console.error('Failed to parse stored user data:', e);
						sessionStorage.removeItem('user');
					}
				}
			}
		}
	};
}

export const userStore = createUserStore();

// Derived store for checking if user is authenticated
export const isAuthenticated = writable(false);

// Subscribe to user store changes to update authentication status
userStore.subscribe((user) => {
	isAuthenticated.set(!!user);
});
