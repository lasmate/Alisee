import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface CartItem {
	id: number;
	name: string;
	description: string;
	size?: string;
	price: number;
	quantity: number;
	customization?: {
		id: number;
		name: string;
		img_path: string;
	};
}

function createCartStore() {
	const { subscribe, set, update } = writable<CartItem[]>([]);

	// Load cart from localStorage on initialization
	if (browser) {
		const stored = localStorage.getItem('cart');
		if (stored) {
			try {
				set(JSON.parse(stored));
			} catch {
				set([]);
			}
		}
	}

	return {
		subscribe,
		addItem: (item: Omit<CartItem, 'quantity'>) => {
			update(items => {
				const existingIndex = items.findIndex(cartItem => 
					cartItem.id === item.id && 
					cartItem.customization?.id === item.customization?.id
				);

				if (existingIndex >= 0) {
					items[existingIndex].quantity += 1;
				} else {
					items.push({ ...item, quantity: 1 });
				}

				if (browser) {
					localStorage.setItem('cart', JSON.stringify(items));
				}
				return items;
			});
		},
		removeItem: (id: number, customizationId?: number) => {
			update(items => {
				const filtered = items.filter(item => 
					!(item.id === id && item.customization?.id === customizationId)
				);
				if (browser) {
					localStorage.setItem('cart', JSON.stringify(filtered));
				}
				return filtered;
			});
		},
		updateQuantity: (id: number, customizationId: number | undefined, quantity: number) => {
			update(items => {
				const index = items.findIndex(item => 
					item.id === id && item.customization?.id === customizationId
				);
				if (index >= 0) {
					if (quantity <= 0) {
						items.splice(index, 1);
					} else {
						items[index].quantity = quantity;
					}
				}
				if (browser) {
					localStorage.setItem('cart', JSON.stringify(items));
				}
				return items;
			});
		},
		clearCart: () => {
			set([]);
			if (browser) {
				localStorage.removeItem('cart');
			}
		},
		getTotalPrice: (items: CartItem[]) => {
			return items.reduce((total, item) => total + (item.price * item.quantity), 0);
		},
		getTotalItems: (items: CartItem[]) => {
			return items.reduce((total, item) => total + item.quantity, 0);
		}
	};
}

export const cartStore = createCartStore();
