/*
 *API endpoint for user registration
 *Handles user registration and returns user data if successful
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema/Users';
import { eq } from 'drizzle-orm';
import { json, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { name, surname, email, password } = await request.json();

	if (!name || !surname || !email || !password) {
		return error(400, 'Name, surname, email, and password are required');
	}
	// Check if user already exists
	const exitingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
	if (exitingUser.length > 0) {
		return error(409, 'User already exists with this email');
	}

	// Create new user
	const newUser = await db.insert(users).values({ name, surname, email, password }).returning();

	return json({ user: newUser });
};
