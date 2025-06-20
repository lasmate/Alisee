import { db } from './index';
import { ImgList } from './schema/ImgList';
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
			id: ImgList.id,
			name: ImgList.name,
			img_path: ImgList.ImgPath
		})
		.from(ImgList)
		.where(eq(ImgList.id, id))
		.limit(1);

	if (!row) return null;

	return {
		id: row.id,
		name: row.name,
		img_path: row.img_path
	};
}
