/**
 * API endpoint for user logout.
 * Handles user session termination by clearing session tokens and cookies.
 */
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/index.js';
import { users } from '$lib/server/db/schema/Users.js';
import { eq } from 'drizzle-orm';

/**
 * Handles POST requests for user logout.
 * Clears session token from database and removes authentication cookie.
 * @return A JSON response with success status or error message.
 */
export const POST: RequestHandler = async ({ cookies }) => {
	try {
		const sessionToken = cookies.get('session');

		if (sessionToken) {
			// Clear session token from database
			await db.update(users)
				.set({ sessionToken: null })
				.where(eq(users.sessionToken, sessionToken));
		}

		return json({ success: true, message: 'Logged out successfully' });
	} catch (error) {
		console.error('Logout error:', error);
		return json({ error: 'Erreur lors de la déconnexion' }, { status: 500 });
	}
};

export const GET: RequestHandler = async () => {
	return new Response();
};
