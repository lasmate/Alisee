import type { RequestHandler } from './$types';
import { getItemById } from '$lib/server/db/itemService';

export const GET: RequestHandler = async ({ url }) => {
	const idParam = url.searchParams.get('productId');
	if (!idParam) {
		return new Response(JSON.stringify({ error: 'Missing productId' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	const id = parseInt(idParam, 10);
	const item = await getItemById(id);
	if (!item) {
		return new Response(JSON.stringify({ error: 'Item not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	return new Response(JSON.stringify(item), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
