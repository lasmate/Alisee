/*
 * API endpoint to disconnect from an account
 * Handles user logout
 */
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema/Users';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ cookies }) => {
	const sessionToken = cookies.get('session');
	if (sessionToken) {
		await db.update(users).set({ sessionToken: null }).where(eq(users.sessionToken, sessionToken));
		cookies.delete('session', { path: '/' });
	}
	return json({ success: true, message: 'Logged out successfully' });
};

export const GET: RequestHandler = async () => {
	return new Response();
};
