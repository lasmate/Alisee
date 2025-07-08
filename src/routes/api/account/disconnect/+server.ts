/*
 * API endpoint to disconnect from an account
 * Handles user logout
 */
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	// Clear any server-side session cookies if you implement them later
	// For now, we're using client-side storage, so just return success

	return json({ success: true, message: 'Logged out successfully' });
};

export const GET: RequestHandler = async () => {
	return new Response();
};
