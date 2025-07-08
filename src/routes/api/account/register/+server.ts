/*
 *API endpoint for user registration
 *Handles user registration and returns user data if successful
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema/Users';
import { eq } from 'drizzle-orm';
import { json, error } from '@sveltejs/kit';
import crypto from 'crypto';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { name, surname, email, password } = await request.json();

		if (!name || !surname || !email || !password) {
			return json({ error: 'Tous les champs sont requis' }, { status: 400 });
		}

		// Check if user already exists
		const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

		if (existingUser && existingUser.length > 0) {
			return json({ error: 'Un utilisateur avec cet email existe déjà' }, { status: 409 });
		}

		// Generate session token
		const sessionToken = crypto.randomUUID();

		// Insert new user
		const newUser = await db.insert(users).values({
			name,
			surname,
			email,
			password,
			sessionToken,
			createdAt: new Date().toISOString(),
			accountType: 0
		}).returning();

		// Set session cookie
		cookies.set('session', sessionToken, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 24 hours
		});

		// Return user data (without password and session token)
		const userData = {
			id: newUser[0].id,
			name: newUser[0].name,
			surname: newUser[0].surname,
			email: newUser[0].email,
			accountType: newUser[0].accountType
		};

		return json({ success: true, user: userData });

	} catch (error) {
		console.error('Registration error:', error);
		return json({ error: 'Erreur lors de la création du compte' }, { status: 500 });
	}
};
