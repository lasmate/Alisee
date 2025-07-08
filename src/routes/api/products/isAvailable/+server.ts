/**
 * Exposes an endpoint to retrieve the total number of products stored.
 * Responds with a JSON object containing the product count.
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { item } from '$lib/server/db/schema/Item';
import { eq } from 'drizzle-orm';
/**
 * Handles GET requests to fetch the valude of the isavailable column from the database.
 * @returns A JSON response with the total product count or an error message.
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const productId = url.searchParams.get('id');
		if (!productId) {
			return new Response(JSON.stringify({ error: 'Product ID is required' }), { status: 400 });
		}

		const result = await db
			.select({ isAvailable: item.isAvailable })
			.from(item)
			.where(eq(item.id, Number(productId)))
			.limit(1);

		if (result.length === 0) {
			return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
		}

		return new Response(JSON.stringify({ isAvailable: result[0].isAvailable }), { status: 200 });
	} catch (error) {
		console.error('Error fetching product availability:', error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
	}
};
