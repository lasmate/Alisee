import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { users } from '../schema/Users.ts';

interface UserData {
	name: string;
	surname: string;
	email: string;
	password: string;
	createdAt?: string;
	accountType: number;
	orderIDs?: string;
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	console.error('DATABASE_URL is not set');
	process.exit(1);
}
const client = createClient({ url: databaseUrl });
const db = drizzle(client, { schema: { users } });

export async function seedUser() {
	const usersToInsert: UserData[] = [
		{
			name: 'Alice',
			surname: 'Smith',
			email: 'alice@example.com',
			password: 'password123',
			createdAt: new Date().toISOString(),
			accountType: 0,
			orderIDs: '[]'
		},
		{
			name: 'Bob',
			surname: 'Johnson',
			email: 'bob@example.com',
			password: 'securepass',
			createdAt: new Date().toISOString(),
			accountType: 0,
			orderIDs: '[]'
		},
		{
			name: 'Admin',
			surname: 'Brown',
			email: 'admin@example.com',
			password: 'adminpass',
			createdAt: new Date().toISOString(),
			accountType: 1,
			orderIDs: '[]'
		}
	];

	for (const user of usersToInsert) {
		await db.insert(users).values(user).onConflictDoNothing();
		console.log(`Inserted user: ${user.name} ${user.surname}`);
	}

	console.log('User seeding complete.');
	await client.close();
}
