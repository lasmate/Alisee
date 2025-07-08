/**
 * API endpoint for admin order management.
 * Handles fetching all orders with related user and item information.
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { orders } from '$lib/server/db/schema/Orders';
import { users } from '$lib/server/db/schema/Users';
import { eq } from 'drizzle-orm';
import { json, error } from '@sveltejs/kit';

/**
 * GET: Fetch all orders with related user and item data
 */
export const GET: RequestHandler = async ({ cookies }) => {
	try {
		// Fetch all orders with user information
		const allOrders = await db
			.select({
				orderId: orders.id,
				firstName: orders.firstName,
				lastName: orders.lastName,
				address: orders.address,
				city: orders.city,
				postalCode: orders.postalCode,
				country: orders.country,
				totalPrice: orders.totalPrice,
				items: orders.items,
				status: orders.status,
				createdAt: orders.createdAt,
				processedAt: orders.processedAt,
				shippedAt: orders.shippedAt,
				userName: users.name,
				userSurname: users.surname,
				userEmail: users.email
			})
			.from(orders)
			.leftJoin(users, eq(orders.userId, users.id))
			.orderBy(orders.createdAt);

		// Parse items and format the response
		const formattedOrders = allOrders.map(order => ({
			...order,
			items: JSON.parse(order.items || '[]'),
			totalPrice: order.totalPrice / 100, // Convert back from cents
			isCompleted: order.status === 'completed'
		}));

		return json(formattedOrders);

	} catch (error) {
		console.error('Error fetching orders:', error);
		return json({ error: 'Erreur lors de la récupération des commandes' }, { status: 500 });
	}
};

/**
 * PATCH: Update order status
 */
export const PATCH: RequestHandler = async ({ request, cookies }) => {
	try {
		const { id, status } = await request.json();

		// Update order status
		await db.update(orders).set({ status }).where(eq(orders.id, id));

		return json({ success: true });

	} catch (error) {
		console.error('Error updating order:', error);
		return json({ error: 'Erreur lors de la mise à jour de la commande' }, { status: 500 });
	}
};
