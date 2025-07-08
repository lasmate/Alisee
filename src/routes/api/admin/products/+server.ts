/**
 * API endpoint for admin product management.
 * Handles fetching all products and updating their availability status.
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { item } from '$lib/server/db/schema/Item';
import { eq } from 'drizzle-orm';
import { json, error } from '@sveltejs/kit';

/**
 * GET: Fetch all products for admin management
 */
export const GET: RequestHandler = async () => {
	try {
		const products = await db.select().from(item);
		return json(products);
	} catch (err) {
		console.error('Error fetching products:', err);
		throw error(500, 'Failed to fetch products');
	}
};

/**
 * PATCH: Update product availability status
 */
export const PATCH: RequestHandler = async ({ request }) => {
	try {
		const { id, isAvailable } = await request.json();

		if (typeof id !== 'number' || typeof isAvailable !== 'number') {
			throw error(400, 'Invalid request data');
		}

		await db.update(item).set({ isAvailable }).where(eq(item.id, id));

		return json({ success: true });
	} catch (err) {
		console.error('Error updating product availability:', err);
		throw error(500, 'Failed to update product availability');
	}
};
