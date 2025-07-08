/**
 * API endpoint for order creation.
 * Handles order submission from the checkout process and stores order data in the database.
 */
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/index.js';
import { orders } from '$lib/server/db/schema/Orders.js';
import { users } from '$lib/server/db/schema/Users.js';
import { eq } from 'drizzle-orm';

/**
 * Handles POST requests to create a new order.
 * Validates user session, processes order data, and stores in database.
 * @return A JSON response with success status and order ID or error message.
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const orderData = await request.json();
		const sessionToken = cookies.get('session');

		if (!sessionToken) {
			return json({ error: 'Non autorisé' }, { status: 401 });
		}

		// Verify user session using your existing pattern
		const user = await db.select().from(users).where(eq(users.sessionToken, sessionToken)).limit(1);

		if (!user || user.length === 0) {
			return json({ error: 'Session invalide' }, { status: 401 });
		}

		// Insert order using Drizzle
		const insertedOrder = await db.insert(orders).values({
			userId: user[0].id,
			firstName: orderData.firstName,
			lastName: orderData.lastName,
			address: orderData.address,
			city: orderData.city,
			postalCode: orderData.postalCode,
			country: orderData.country,
			totalPrice: Math.round(orderData.totalPrice * 100), // Convert to cents
			items: JSON.stringify(orderData.items),
			status: 'pending',
			createdAt: new Date()
		}).returning();

		return json({ 
			success: true, 
			orderId: insertedOrder[0].id
		});

	} catch (error) {
		console.error('Order creation error:', error);
		return json({ error: 'Erreur lors de la création de la commande' }, { status: 500 });
	}
};
