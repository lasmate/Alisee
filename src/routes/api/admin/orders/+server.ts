/**
 * API endpoint for admin order management.
 * Handles fetching all orders with related user information and updating order status.
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { orders } from '$lib/server/db/schema/Orders';
import { users } from '$lib/server/db/schema/Users';
import { eq } from 'drizzle-orm';
import { json, error } from '@sveltejs/kit';

/**
 * Handles GET requests to fetch all orders with user information.
 * Returns orders with parsed items and formatted pricing for admin display.
 * @return A JSON response with formatted order data or error message.
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
 * Handles PATCH requests to update order status.
 * Allows admin to change order status (pending, processing, shipped, completed).
 * @return A JSON response with success status or error message.
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
