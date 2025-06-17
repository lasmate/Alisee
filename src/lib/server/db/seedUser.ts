import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { users } from './schema/Users';

interface UserData {
  name: string;
  surname: string;
  email: string;
  password: string;
  createdAt?: string;
  accountType: string;
  orderIDs?: string;
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}
const client = createClient({ url: databaseUrl });
const db = drizzle(client, { schema: { users } });

async function seedUser() {
  const usersToInsert: UserData[] = [
    {
      name: 'Alice',
      surname: 'Smith',
      email: 'alice@example.com',
      password: 'password123',
      createdAt: new Date().toISOString(),
      accountType: 'customer',
      orderIDs: '[]'
    },
    {
      name: 'Bob',
      surname: 'Johnson',
      email: 'bob@example.com',
      password: 'securepass',
      createdAt: new Date().toISOString(),
      accountType: 'admin',
      orderIDs: '[]'
    }
  ];

  for (const user of usersToInsert) {
    await db.insert(users).values(user);
    console.log(`Inserted user: ${user.name} ${user.surname}`);
  }

  console.log('User seeding complete.');
  process.exit(0);
}

seedUser().catch(err => {
  console.error('User seeding failed:', err);
  process.exit(1);
});
