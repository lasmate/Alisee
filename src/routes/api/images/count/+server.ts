import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { ImgList } from '$lib/server/db/schema/ImgList';
import { count } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	try {
		const result = await db.select({ value: count() }).from(ImgList);
		const totalItems = result[0]?.value || 0;
		return new Response(JSON.stringify({ count: totalItems }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching product count:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch product count' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
