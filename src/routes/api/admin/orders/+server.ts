/**
 * API endpoint for admin order management.
 * Handles fetching all orders with related user and item information.
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { orders } from '$lib/server/db/schema/Orders';
import { users } from '$lib/server/db/schema/Users';
import { item } from '$lib/server/db/schema/Item';
import { eq } from 'drizzle-orm';
import { json, error } from '@sveltejs/kit';

/**
 * GET: Fetch all orders with related user and item data
 */
export const GET: RequestHandler = async () => {
	try {
		const allOrders = await db
			.select({
				orderId: orders.id,
				itemId: orders.itemId,
				itemName: item.name,
				userId: orders.userId,
				userName: users.name,
				userSurname: users.surname,
				userEmail: users.email,
				createdAt: orders.createdAt,
				processedAt: orders.processedAt,
				shippedAt: orders.shippedAt,
				shippingAddress: orders.shippingAddress,
				price: orders.price,
				isCompleted: orders.isCompleted
			})
			.from(orders)
			.leftJoin(users, eq(orders.userId, users.id))
			.leftJoin(item, eq(orders.itemId, item.id));
		
		return json(allOrders);
	} catch (err) {
		console.error('Error fetching orders:', err);
		throw error(500, 'Failed to fetch orders');
	}
};

/**
 * PATCH: Update order status
 */
export const PATCH: RequestHandler = async ({ request }) => {
	try {
		const { id, isCompleted, processedAt, shippedAt } = await request.json();
		
		if (typeof id !== 'number') {
			throw error(400, 'Invalid order ID');
		}

		const updateData: any = {};
		if (typeof isCompleted === 'boolean') updateData.isCompleted = isCompleted;
		if (processedAt !== undefined) updateData.processedAt = processedAt;
		if (shippedAt !== undefined) updateData.shippedAt = shippedAt;

		await db
			.update(orders)
			.set(updateData)
			.where(eq(orders.id, id));

		return json({ success: true });
	} catch (err) {
		console.error('Error updating order:', err);
		throw error(500, 'Failed to update order');
	}
};
