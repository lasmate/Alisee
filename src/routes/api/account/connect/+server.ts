/*
*API endpoint to connect to an account
*Handles user login and returns user data if successful
*/
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema/Users';
import { eq } from 'drizzle-orm';
import { json, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json();

    if (!email || !password) {
        return error(400, 'Email and password are required');
    }
    // Check if user exists and password matches
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (user.length === 0 || user[0].password !== password) {
        return error(401, 'Invalid email or password');
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user[0];
    
    return json({ user: userWithoutPassword });
};