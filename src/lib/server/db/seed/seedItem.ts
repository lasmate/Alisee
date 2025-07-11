import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { item } from '../schema/Item.ts';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	console.error('DATABASE_URL is not set');
	process.exit(1);
}
const client = createClient({ url: databaseUrl });
const db = drizzle(client, { schema: { item } });

export async function seedItem() {
	interface ItemData {
		name: string;
		description: string;
		image: string;
		size: string;
		price: number;
		quantity: number;
		category: string;
		tags: string;
		isAvailable: number;
		isCustomisable: number;
	}
	const itemsToInsert: ItemData[] = [
		{
			name: 'Petit Badge',
			description: 'Petit Badge avec une broche.',
			image: '1.jpg',
			size: '56mm',
			price: 1,
			quantity: 100,
			category: 'Badge',
			tags: 'Badge,Petit',
			isAvailable: 1,
			isCustomisable: 1
		},
		{
			name: 'Grand Badge',
			description: 'Grand Badge avec une broche.',
			image: '2.jpg',
			size: '70mm',
			price: 1.5,
			quantity: 100,
			category: 'Badge',
			tags: 'Badge,Grand',
			isAvailable: 1,
			isCustomisable: 1
		},
		{
			name: 'Porte-Clés',
			description: 'Porte-Clés.',
			image: '3.jpg',
			size: '56mm',
			price: 1,
			quantity: 100,
			category: 'Porte-Clés',
			tags: 'Porte-Clés,Miroir',
			isAvailable: 1,
			isCustomisable: 1
		},
		{
			name: 'Porte-Clés miroir',
			description: 'Porte-Clés avec un petit miroir.',
			image: '4.jpg',
			size: '56mm',
			price: 2,
			quantity: 100,
			category: 'Porte-Clés',
			tags: 'Porte-Clés,components',
			isAvailable: 1,
			isCustomisable: 1
		},
		{
			name: 'Petit Magnet',
			description: 'Petit Magnet.',
			image: '5.jpg',
			size: '56mm',
			price: 1,
			quantity: 100,
			category: 'Magnet',
			tags: 'Magnet,Petit',
			isAvailable: 1,
			isCustomisable: 1
		},
		{
			name: 'Grand Magnet',
			description: 'Grand Magnet.',
			image: '6.jpg',
			size: '70mm',
			price: 1.5,
			quantity: 100,
			category: 'Magnet',
			tags: 'Magnet,Grand',
			isAvailable: 1,
			isCustomisable: 1
		},
		{
			name: 'Petit Miroir',
			description: 'Petit Miroir.',
			image: '7.jpg',
			size: '56mm',
			price: 1,
			quantity: 100,
			category: 'Miroir',
			tags: 'Miroir,Petit',
			isAvailable: 1,
			isCustomisable: 1
		},
		{
			name: 'Grand Miroir',
			description: 'Grand Miroir.',
			image: '8.jpg',
			size: '70mm',
			price: 1.5,
			quantity: 100,
			category: 'Miroir',
			tags: 'Miroir,Grand',
			isAvailable: 1,
			isCustomisable: 1
		},
		{
			name: 'Porte-Clés Decapsuleur',
			description: 'Porte-Clés avec un petit miroir.',
			image: '9.jpg',
			size: '56mm',
			price: 2,
			quantity: 100,
			category: 'Porte-Clés',
			tags: 'Porte-Clés,Decapsuleur,Petit',
			isAvailable: 1,
			isCustomisable: 1
		},
		{
			name: 'Magnet Decapsuleur',
			description: 'Petit Magnet.',
			image: '10.jpg',
			size: '56mm',
			price: 2,
			quantity: 100,
			category: 'Decapsuleur',
			tags: 'Magnet,Petit,Decapsuleur',
			isAvailable: 1,
			isCustomisable: 1
		},
		{
			name: 'Mug',
			description: 'Mug.',
			image: '11.jpg',
			size: '',
			price: 10,
			quantity: 100,
			category: 'Mug',
			tags: 'Mug',
			isAvailable: 1,
			isCustomisable: 1
		}
	];

	for (const data of itemsToInsert) {
		await db.insert(item).values(data).onConflictDoNothing();
		console.log(`Inserted item: ${data.name}`);
	}

	console.log('Item seeding complete.');
	await client.close();
}
