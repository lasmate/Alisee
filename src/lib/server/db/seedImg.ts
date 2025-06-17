import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { ImgList } from './schema/ImgList.ts';

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
const db = drizzle(client, { schema: { ImgList } });

export async function seedImg() {
	const imgsToInsert: ImgData[] = [
		//Coeur
		{ name: 'Coeur Girlande', ImgPath: 'Coeur/1.jpg' },
		{ name: 'Coeur arc-en-ciel', ImgPath: 'Coeur/2.jpg' },
		{ name: 'Coeur Dentelle Rouge', ImgPath: 'Coeur/3.jpg' },
		{ name: 'Coeur Pattern Rose-Ciel Cover', ImgPath: 'Coeur/4.jpg' },
		{ name: 'Coeur Candy Bleu-Ciel', ImgPath: 'Coeur/5.jpg' },
		{ name: 'Coeur Cafe', ImgPath: 'Coeur/6.jpg' },
		{ name: 'Coeur ECG', ImgPath: 'Coeur/7.jpg' },
		{ name: 'Coeur Corde', ImgPath: 'Coeur/8.jpg' },
		{ name: 'Coeur Dessin Rouge', ImgPath: 'Coeur/9.jpg' },
		{ name: 'Coeur Pattern Rose Cover', ImgPath: 'Coeur/10.jpg' },
		{ name: 'Coeur Pattern Rose Contain', ImgPath: 'Coeur/11.jpg' },
		{ name: 'Coeur Pattern Rouge Contain', ImgPath: 'Coeur/12.jpg' },
		{ name: 'Coeur Pattern Etoile Contain', ImgPath: 'Coeur/13.jpg' },
		{ name: 'Coeur Border arc-en-ciel Contain', ImgPath: 'Coeur/14.jpg' },
		{ name: 'Coeur Arbre Contain', ImgPath: 'Coeur/15.jpg' },
		{ name: 'Coeur Dessin Fleche Rouge ', ImgPath: 'Coeur/16.jpg' },
		{ name: 'Coeur Border Fleur', ImgPath: 'Coeur/17.jpg' },
		{ name: 'Coeur Border Peinture Rouge', ImgPath: 'Coeur/18.jpg' },
		{ name: 'Coeur Pattern Petit Rouge Contain ', ImgPath: 'Coeur/19.jpg' },
		{ name: 'Coeur Pattern Note Contain ', ImgPath: 'Coeur/20.jpg' },
		{ name: 'Coeur Pattern Rose-Ciel Contain', ImgPath: 'Coeur/21.jpg' },
		{ name: 'Coeur Splash ', ImgPath: 'Coeur/22.jpg' },
		{ name: 'Coeur Arbre Noir ', ImgPath: 'Coeur/23.jpg' },
		{ name: 'Coeur Arbre Rouge ', ImgPath: 'Coeur/24.jpg' },
		{ name: 'Coeur Gradient 1 ', ImgPath: 'Coeur/25.jpg' },
		{ name: 'Coeur Gradient 2 ', ImgPath: 'Coeur/26.jpg' },
		{ name: 'Coeur Gradient 3 ', ImgPath: 'Coeur/27.jpg' },
		{ name: 'Coeur Gradient 4 ', ImgPath: 'Coeur/28.jpg' },
		{ name: 'Coeur Gradient 5 ', ImgPath: 'Coeur/29.jpg' },
		{ name: 'Coeur Caleidoscope ', ImgPath: 'Coeur/30.jpg' },
		{ name: 'Coeur Pride ', ImgPath: 'Coeur/31.jpg' },
		{ name: 'Coeur Pride Mix ', ImgPath: 'Coeur/32.jpg' },
		{ name: 'Coeur Pride Mix 2 ', ImgPath: 'Coeur/33.jpg' },
		{ name: 'Coeur Pride Side ', ImgPath: 'Coeur/34.jpg' },
		{ name: 'Coeur Pigment ', ImgPath: 'Coeur/35.jpg' },
		{ name: 'Coeur Pride Mix 3 ', ImgPath: 'Coeur/36.jpg' },
		{ name: 'Coeur Chien 1 ', ImgPath: 'Coeur/37.jpg' },
		{ name: 'Coeur Chien 2 ', ImgPath: 'Coeur/38.jpg' },
		{ name: 'Coeur Chien 3 ', ImgPath: 'Coeur/39.jpg' },
		{ name: 'Coeur Chien 4 ', ImgPath: 'Coeur/40.jpg' },
		{ name: 'Coeur Chien 5 ', ImgPath: 'Coeur/41.jpg' },
		//Hero
		{ name: 'Hero Captain Bouclier Vert ', ImgPath: 'Hero/1.jpg' },
		{ name: 'Hero Equipe ', ImgPath: 'Hero/2.jpg' },
		{ name: 'Hero Captain Cartoon ', ImgPath: 'Hero/3.jpg' },
		{ name: 'Hero Captain Bouclier Blanc ', ImgPath: 'Hero/4.jpg' },
		{ name: 'Hero Iron ', ImgPath: 'Hero/5.jpg' },
		{ name: 'Hero Pool ', ImgPath: 'Hero/6.jpg' },
		{ name: 'Hero Equipe Picasso ', ImgPath: 'Hero/7.jpg' },
		{ name: 'Hero Green ', ImgPath: 'Hero/8.jpg' },
		{ name: 'Hero Green Tete ', ImgPath: 'Hero/9.jpg' },
		{ name: 'Hero Iron Noir ', ImgPath: 'Hero/10.jpg' },
		{ name: 'Hero Iron Tete ', ImgPath: 'Hero/11.jpg' },
		{ name: 'Hero Iron Mini ', ImgPath: 'Hero/12.jpg' },
		{ name: 'Hero Super Close ', ImgPath: 'Hero/13.jpg' },
		{ name: 'Hero Super Close 2 ', ImgPath: 'Hero/14.jpg' },
		{ name: 'Hero Bolt ', ImgPath: 'Hero/15.jpg' },
		{ name: 'Hero Iron Torse ', ImgPath: 'Hero/16.jpg' },
		{ name: 'Hero Pool 2 ', ImgPath: 'Hero/17.jpg' },
		{ name: 'Hero Spider ', ImgPath: 'Hero/18.jpg' },
		{ name: 'Hero Spider Mini ', ImgPath: 'Hero/19.jpg' },
		{ name: 'Hero Super ', ImgPath: 'Hero/20.jpg' },
		{ name: 'Hero Thor ', ImgPath: 'Hero/21.jpg' },
		{ name: 'Hero Snap ', ImgPath: 'Hero/22.jpg' },
		{ name: 'Hero DC ', ImgPath: 'Hero/23.jpg' },
		{ name: 'Hero awawa ', ImgPath: 'Hero/24.jpg' },
		{ name: 'Hero Naruto ', ImgPath: 'Hero/25.jpg' },
		{ name: 'Hero Pika ', ImgPath: 'Hero/26.jpg' },
		//Zen
		{ name: 'Zen Mandala 1 ', ImgPath: 'Zen/1.jpg' },
		{ name: 'Zen Mandala 2 ', ImgPath: 'Zen/2.jpg' },
		{ name: 'Zen Sakura 1 ', ImgPath: 'Zen/3.jpg' },
		{ name: 'Zen Sakura 2 ', ImgPath: 'Zen/4.jpg' },
		{ name: 'Zen Lotus 1 ', ImgPath: 'Zen/5.jpg' },
		{ name: 'Zen Trefle ', ImgPath: 'Zen/6.jpg' },
		{ name: 'Zen Mandala 3 ', ImgPath: 'Zen/7.jpg' },
		{ name: 'Zen Mandala 4 ', ImgPath: 'Zen/8.jpg' },
		{ name: 'Zen Mandala 5 ', ImgPath: 'Zen/9.jpg' },
		{ name: 'Zen Mandala 6 ', ImgPath: 'Zen/10.jpg' },
		{ name: 'Zen Mandala 7 ', ImgPath: 'Zen/11.jpg' },
		{ name: 'Zen Mandala 8 ', ImgPath: 'Zen/12.jpg' },
		{ name: 'Zen Mandala 9 ', ImgPath: 'Zen/13.jpg' },
		{ name: 'Zen Mandala 10 ', ImgPath: 'Zen/14.jpg' },
		{ name: 'Zen Mandala 11 ', ImgPath: 'Zen/15.jpg' },
		{ name: 'Zen Mandala 12 ', ImgPath: 'Zen/16.jpg' },
		{ name: 'Zen Mandala 13 ', ImgPath: 'Zen/17.jpg' },
		{ name: 'Zen Mandala 14 ', ImgPath: 'Zen/18.jpg' },
		{ name: 'Zen Mandala 15 ', ImgPath: 'Zen/19.jpg' },
		{ name: 'Zen Mandala 16 ', ImgPath: 'Zen/20.jpg' },
		{ name: 'Zen Mandala 17 ', ImgPath: 'Zen/21.jpg' },
		{ name: 'Zen Mandala 18 ', ImgPath: 'Zen/22.jpg' },
		{ name: 'Zen Mandala 19 ', ImgPath: 'Zen/23.jpg' },
		{ name: 'Zen Lotus 2 ', ImgPath: 'Zen/24.jpg' },
		{ name: 'Zen YingYang ', ImgPath: 'Zen/25.jpg' },
		{ name: 'Zen Buhda 26 ', ImgPath: 'Zen/26.jpg' },
		{ name: 'Zen Lotus 3 ', ImgPath: 'Zen/27.jpg' },
		{ name: 'Zen Lotus 4 ', ImgPath: 'Zen/28.jpg' },
		{ name: 'Zen Lotus 5 ', ImgPath: 'Zen/29.jpg' },
		{ name: 'Zen Lotus 6 ', ImgPath: 'Zen/30.jpg' }
	];

	for (const img of imgsToInsert) {
		await db.insert(ImgList).values(img).onConflictDoNothing();
		console.log(`Inserted image record: ${img.ImgPath}`);
	}

	console.log('Image seeding complete.');
	await client.close();
}
