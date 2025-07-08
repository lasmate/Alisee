/**
 * API endpoint to retrieve a specific image by ID.
 * Responds with image data for customization selection in product popovers.
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { img_list } from '$lib/server/db/schema/ImgList';
import { eq } from 'drizzle-orm';

/**
 * Handles GET requests to fetch a specific image by ID.
 * @param params - Contains the image ID from the URL path
 * @return A JSON response with image data or error message.
 */
export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return new Response(JSON.stringify({ error: 'Invalid image ID' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const result = await db.select().from(img_list).where(eq(img_list.id, id)).limit(1);

		if (result.length === 0) {
			return new Response(JSON.stringify({ error: 'Image not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(JSON.stringify(result[0]), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching image:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch image' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
