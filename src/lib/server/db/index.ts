import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as itemSchema from './schema/Item';
import * as orderSchema from './schema/Orders';
import * as userSchema from './schema/Users';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = createClient({ url: env.DATABASE_URL });

export const db = drizzle(client, { schema: { ...itemSchema, ...orderSchema, ...userSchema } });
