import { writable } from 'svelte/store';

export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
}

function createCartStore() {
	const { subscribe, set, update } = writable<CartItem[]>([]);

	return {
		subscribe,
		addItem: (item: Omit<CartItem, 'quantity'>) => {
			update((items) => {
				const existingItem = items.find((i) => i.id === item.id);
				if (existingItem) {
					existingItem.quantity += 1;
					return items;
				} else {
					return [...items, { ...item, quantity: 1 }];
				}
			});
		},
		removeItem: (id: string) => {
			update((items) => items.filter((item) => item.id !== id));
		},
		updateQuantity: (id: string, quantity: number) => {
			update((items) => {
				if (quantity <= 0) {
					return items.filter((item) => item.id !== id);
				}
				return items.map((item) => (item.id === id ? { ...item, quantity } : item));
			});
		},
		clear: () => set([]),
		getTotalPrice: (items: CartItem[]) => {
			return items.reduce((total, item) => total + item.price * item.quantity, 0);
		},
		getTotalItems: (items: CartItem[]) => {
			return items.reduce((total, item) => total + item.quantity, 0);
		}
	};
}

export const cart = createCartStore();
