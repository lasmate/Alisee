/*
 *API endpoint to connect to an account
 *Handles user login and returns user data if successful
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/index.js';
import { users } from '$lib/server/db/schema/Users.js';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import crypto from 'crypto';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			return json({ error: 'Email et mot de passe requis' }, { status: 400 });
		}

		// Find user by email
		const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

		if (!user || user.length === 0) {
			return json({ error: 'Utilisateur non trouvé' }, { status: 404 });
		}

		// Verify password (since you removed hashing, direct comparison)
		if (password !== user[0].password) {
			return json({ error: 'Mot de passe incorrect' }, { status: 401 });
		}

		// Generate session token
		const sessionToken = crypto.randomUUID();

		// Update user with session token
		await db.update(users)
			.set({ sessionToken })
			.where(eq(users.id, user[0].id));

		// Set session cookie
		cookies.set('session', sessionToken, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		// Return user data (without password and session token)
		const userData = {
			id: user[0].id,
			name: user[0].name,
			surname: user[0].surname,
			email: user[0].email,
			accountType: user[0].accountType
		};

		return json({ success: true, user: userData });

	} catch (error) {
		console.error('Login error:', error);
		return json({ error: 'Erreur de connexion' }, { status: 500 });
	}
};
