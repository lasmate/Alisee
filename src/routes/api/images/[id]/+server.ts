/**
 * API endpoint to fetch image details by ID.
 * Returns image information including name and path.
 */
import type { RequestHandler } from './$types';
import { getImgById } from '$lib/server/db/imageService';
import { error } from '@sveltejs/kit';

/**
 * Handles GET requests to fetch image details by ID.
 * @param params - Contains the image ID from the URL parameter
 * @returns A JSON response with image details or an error message.
 */
export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			throw error(400, 'Invalid image ID');
		}

		const imageDetails = await getImgById(id);

		if (!imageDetails) {
			throw error(404, 'Image not found');
		}

		return new Response(JSON.stringify(imageDetails), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('Error fetching image details:', err);

		if (err && typeof err === 'object' && 'status' in err) {
			throw err; // Re-throw SvelteKit errors
		}

		throw error(500, 'Failed to fetch image details');
	}
};
