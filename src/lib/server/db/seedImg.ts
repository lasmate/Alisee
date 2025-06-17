import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { item as imgEntry } from './schema/ImgList';

interface ImgData {
  name: string;
  ImgPath: string;
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}
const client = createClient({ url: databaseUrl });
const db = drizzle(client, { schema: { imgEntry } });

async function seedImg() {
  const imgsToInsert: ImgData[] = [
    { name: 'Produit 1', ImgPath: '1.jpg' },
    { name: 'Produit 2', ImgPath: '2.jpg' },
    { name: 'Produit 3', ImgPath: '3.jpg' },
    { name: 'Produit 4', ImgPath: '4.jpg' },
    { name: 'Produit 5', ImgPath: '5.jpg' },
    { name: 'Produit 6', ImgPath: '6.jpg' },
    { name: 'Produit 7', ImgPath: '7.jpg' },
    { name: 'Produit 8', ImgPath: '8.jpg' },
    { name: 'Produit 9', ImgPath: '9.jpg' },
    { name: 'Produit 10', ImgPath: '10.jpg' }
  ];

  for (const img of imgsToInsert) {
    await db.insert(imgEntry).values(img);
    console.log(`Inserted image record: ${img.ImgPath}`);
  }

  console.log('Image seeding complete.');
  process.exit(0);
}

seedImg().catch(err => {
  console.error('Image seeding failed:', err);
  process.exit(1);
});
