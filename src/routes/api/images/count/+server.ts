/**
 * Exposes an endpoint to retrieve the total number of images stored.
 * Responds with a JSON object containing the image count.
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { img_list } from '$lib/server/db/schema/ImgList';
import { count } from 'drizzle-orm';

/**
 * Handles GET requests to fetch the image count from the database.
 * @return A JSON response with the total image count or an error message.
 */
export const GET: RequestHandler = async () => {
	try {
		const result = await db.select({ value: count() }).from(img_list);
		const totalItems = result[0]?.value || 0;

		// Sends the count as JSON.
		return new Response(JSON.stringify({ count: totalItems }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching product count:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch product count' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
