import type { RequestHandler } from '@sveltejs/kit';
import { getImgById } from '$lib/server/db/imageService';

export const GET: RequestHandler = async ({ url }) => {
    const idParam = url.searchParams.get('imgId');
    if (!idParam) {
        return new Response(JSON.stringify({ error: 'Missing imgId' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    const id = parseInt(idParam, 10);
    const img = await getImgById(id);
    if (!img) {
        return new Response(JSON.stringify({ error: 'Image not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new Response(JSON.stringify(img), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    }); 
}

