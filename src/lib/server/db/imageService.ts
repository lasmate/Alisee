import { db } from './index';
import { img_list } from './schema/ImgList';
import { eq } from 'drizzle-orm';

export interface ImgDetails {
	id: number;
	name: string;
	img_path: string;
}

/**
 * Fetch an image details by its ID.
 * @param id - The ID of the image to fetch.
 * @returns The image's details or null if not found.
 */
export async function getImgById(id: number): Promise<ImgDetails | null> {
	const [row] = await db
		.select({
			id: img_list.id,
			name: img_list.name,
			img_path: img_list.img_path
		})
		.from(img_list)
		.where(eq(img_list.id, id))
		.limit(1);

	if (!row) return null;

	return {
		id: row.id,
		name: row.name,
		img_path: row.img_path
	};
}
