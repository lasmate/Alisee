import { db } from './index';
import { item } from './schema/Item';
import { eq } from 'drizzle-orm';

export interface ItemDetails {
	id: number;
	name: string;
	description: string;
	size: string | null;
	price: number;
}

/**
 * Fetch an item's details by its ID.
 * @param id - The ID of the item to fetch.
 * @returns The item's details or null if not found.
 */
export async function getItemById(id: number): Promise<ItemDetails | null> {
	const [row] = await db
		.select({
			id: item.id,
			name: item.name,
			description: item.description,
			size: item.size,
			price: item.price
		})
		.from(item)
		.where(eq(item.id, id))
		.limit(1);

	if (!row) return null;

	return {
		id: row.id,
		name: row.name,
		description: row.description,
		size: row.size,
		price: row.price
	};
}
