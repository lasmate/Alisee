/**
 * API endpoint for admin user management.
 * Handles fetching all users, deleting users, and updating account types.
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema/Users';
import { eq } from 'drizzle-orm';
import { json, error } from '@sveltejs/kit';

/**
 * GET: Fetch all users for admin management
 */
export const GET: RequestHandler = async () => {
	try {
		const allUsers = await db
			.select({
				id: users.id,
				name: users.name,
				surname: users.surname,
				email: users.email,
				createdAt: users.createdAt,
				accountType: users.accountType,
				orderIDs: users.orderIDs
			})
			.from(users);

		return json(allUsers);
	} catch (err) {
		console.error('Error fetching users:', err);
		throw error(500, 'Failed to fetch users');
	}
};

/**
 * DELETE: Delete a specific user
 */
export const DELETE: RequestHandler = async ({ request }) => {
	try {
		const { id } = await request.json();

		if (typeof id !== 'number') {
			throw error(400, 'Invalid user ID');
		}

		await db.delete(users).where(eq(users.id, id));
		return json({ success: true });
	} catch (err) {
		console.error('Error deleting user:', err);
		throw error(500, 'Failed to delete user');
	}
};

/**
 * PATCH: Update user account type
 */
export const PATCH: RequestHandler = async ({ request }) => {
	try {
		const { id, accountType } = await request.json();

		if (typeof id !== 'number' || typeof accountType !== 'number') {
			throw error(400, 'Invalid request data');
		}

		await db.update(users).set({ accountType }).where(eq(users.id, id));

		return json({ success: true });
	} catch (err) {
		console.error('Error updating user account type:', err);
		throw error(500, 'Failed to update user account type');
	}
};
