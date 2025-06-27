import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { img_list } from '../schema/ImgList.ts';

interface ImgData {
	name: string;
	img_path: string;
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	console.error('DATABASE_URL is not set');
	process.exit(1);
}
const client = createClient({ url: databaseUrl });
const db = drizzle(client, { schema: { img_list } });

export async function seedImg() {
	const imgsToInsert: ImgData[] = [
		//Coeur
		{ name: 'Coeur Girlande', img_path: 'Coeur/1.jpg' },
		{ name: 'Coeur arc-en-ciel', img_path: 'Coeur/2.jpg' },
		{ name: 'Coeur Dentelle Rouge', img_path: 'Coeur/3.jpg' },
		{ name: 'Coeur Pattern Rose-Ciel Cover', img_path: 'Coeur/4.jpg' },
		{ name: 'Coeur Candy Bleu-Ciel', img_path: 'Coeur/5.jpg' },
		{ name: 'Coeur Cafe', img_path: 'Coeur/6.jpg' },
		{ name: 'Coeur ECG', img_path: 'Coeur/7.jpg' },
		{ name: 'Coeur Corde', img_path: 'Coeur/8.jpg' },
		{ name: 'Coeur Dessin Rouge', img_path: 'Coeur/9.jpg' },
		{ name: 'Coeur Pattern Rose Cover', img_path: 'Coeur/10.jpg' },
		{ name: 'Coeur Pattern Rose Contain', img_path: 'Coeur/11.jpg' },
		{ name: 'Coeur Pattern Rouge Contain', img_path: 'Coeur/12.jpg' },
		{ name: 'Coeur Pattern Etoile Contain', img_path: 'Coeur/13.jpg' },
		{ name: 'Coeur Border arc-en-ciel Contain', img_path: 'Coeur/14.jpg' },
		{ name: 'Coeur Arbre Contain', img_path: 'Coeur/15.jpg' },
		{ name: 'Coeur Dessin Fleche Rouge ', img_path: 'Coeur/16.jpg' },
		{ name: 'Coeur Border Fleur', img_path: 'Coeur/17.jpg' },
		{ name: 'Coeur Border Peinture Rouge', img_path: 'Coeur/18.jpg' },
		{ name: 'Coeur Pattern Petit Rouge Contain ', img_path: 'Coeur/19.jpg' },
		{ name: 'Coeur Pattern Note Contain ', img_path: 'Coeur/20.jpg' },
		{ name: 'Coeur Pattern Rose-Ciel Contain', img_path: 'Coeur/21.jpg' },
		{ name: 'Coeur Splash ', img_path: 'Coeur/22.jpg' },
		{ name: 'Coeur Arbre Noir ', img_path: 'Coeur/23.jpg' },
		{ name: 'Coeur Arbre Rouge ', img_path: 'Coeur/24.jpg' },
		{ name: 'Coeur Gradient 1 ', img_path: 'Coeur/25.jpg' },
		{ name: 'Coeur Gradient 2 ', img_path: 'Coeur/26.jpg' },
		{ name: 'Coeur Gradient 3 ', img_path: 'Coeur/27.jpg' },
		{ name: 'Coeur Gradient 4 ', img_path: 'Coeur/28.jpg' },
		{ name: 'Coeur Gradient 5 ', img_path: 'Coeur/29.jpg' },
		{ name: 'Coeur Caleidoscope ', img_path: 'Coeur/30.jpg' },
		{ name: 'Coeur Pride ', img_path: 'Coeur/31.jpg' },
		{ name: 'Coeur Pride Mix ', img_path: 'Coeur/32.jpg' },
		{ name: 'Coeur Pride Mix 2 ', img_path: 'Coeur/33.jpg' },
		{ name: 'Coeur Pride Side ', img_path: 'Coeur/34.jpg' },
		{ name: 'Coeur Pigment ', img_path: 'Coeur/35.jpg' },
		{ name: 'Coeur Pride Mix 3 ', img_path: 'Coeur/36.jpg' },
		{ name: 'Coeur Chien 1 ', img_path: 'Coeur/37.jpg' },
		{ name: 'Coeur Chien 2 ', img_path: 'Coeur/38.jpg' },
		{ name: 'Coeur Chien 3 ', img_path: 'Coeur/39.jpg' },
		{ name: 'Coeur Chien 4 ', img_path: 'Coeur/40.jpg' },
		{ name: 'Coeur Chien 6 ', img_path: 'Coeur/41.jpg' },
		//Hero
		{ name: 'Hero Captain Bouclier Vert ', img_path: 'Hero/1.jpg' },
		{ name: 'Hero Equipe ', img_path: 'Hero/2.jpg' },
		{ name: 'Hero Captain Cartoon ', img_path: 'Hero/3.jpg' },
		{ name: 'Hero Captain Bouclier Blanc ', img_path: 'Hero/4.jpg' },
		{ name: 'Hero Iron ', img_path: 'Hero/5.jpg' },
		{ name: 'Hero Pool ', img_path: 'Hero/6.jpg' },
		{ name: 'Hero Equipe Picasso ', img_path: 'Hero/7.jpg' },
		{ name: 'Hero Green ', img_path: 'Hero/8.jpg' },
		{ name: 'Hero Green Tete ', img_path: 'Hero/9.jpg' },
		{ name: 'Hero Iron Noir ', img_path: 'Hero/10.jpg' },
		{ name: 'Hero Iron Tete ', img_path: 'Hero/11.jpg' },
		{ name: 'Hero Iron Mini ', img_path: 'Hero/12.jpg' },
		{ name: 'Hero Super Close ', img_path: 'Hero/13.jpg' },
		{ name: 'Hero Super Close 2 ', img_path: 'Hero/14.jpg' },
		{ name: 'Hero Bolt ', img_path: 'Hero/15.jpg' },
		{ name: 'Hero Iron Torse ', img_path: 'Hero/16.jpg' },
		{ name: 'Hero Pool 2 ', img_path: 'Hero/17.jpg' },
		{ name: 'Hero Spider ', img_path: 'Hero/18.jpg' },
		{ name: 'Hero Spider Mini ', img_path: 'Hero/19.jpg' },
		{ name: 'Hero Super ', img_path: 'Hero/20.jpg' },
		{ name: 'Hero Thor ', img_path: 'Hero/21.jpg' },
		{ name: 'Hero Snap ', img_path: 'Hero/22.jpg' },
		{ name: 'Hero DC ', img_path: 'Hero/23.jpg' },
		{ name: 'Hero awawa ', img_path: 'Hero/24.jpg' },
		{ name: 'Hero Naruto ', img_path: 'Hero/25.jpg' },
		{ name: 'Hero Pika ', img_path: 'Hero/26.jpg' },
		//Zen
		{ name: 'Zen Mandala 1 ', img_path: 'Zen/1.jpg' },
		{ name: 'Zen Mandala 2 ', img_path: 'Zen/2.jpg' },
		{ name: 'Zen Sakura 1 ', img_path: 'Zen/3.jpg' },
		{ name: 'Zen Sakura 2 ', img_path: 'Zen/4.jpg' },
		{ name: 'Zen Lotus 1 ', img_path: 'Zen/5.jpg' },
		{ name: 'Zen Trefle ', img_path: 'Zen/6.jpg' },
		{ name: 'Zen Mandala 3 ', img_path: 'Zen/7.jpg' },
		{ name: 'Zen Mandala 4 ', img_path: 'Zen/8.jpg' },
		{ name: 'Zen Mandala 5 ', img_path: 'Zen/9.jpg' },
		{ name: 'Zen Mandala 6 ', img_path: 'Zen/10.jpg' },
		{ name: 'Zen Mandala 7 ', img_path: 'Zen/11.jpg' },
		{ name: 'Zen Mandala 8 ', img_path: 'Zen/12.jpg' },
		{ name: 'Zen Mandala 9 ', img_path: 'Zen/13.jpg' },
		{ name: 'Zen Mandala 10 ', img_path: 'Zen/14.jpg' },
		{ name: 'Zen Mandala 11 ', img_path: 'Zen/15.jpg' },
		{ name: 'Zen Mandala 12 ', img_path: 'Zen/16.jpg' },
		{ name: 'Zen Mandala 13 ', img_path: 'Zen/17.jpg' },
		{ name: 'Zen Mandala 14 ', img_path: 'Zen/18.jpg' },
		{ name: 'Zen Mandala 15 ', img_path: 'Zen/19.jpg' },
		{ name: 'Zen Mandala 16 ', img_path: 'Zen/20.jpg' },
		{ name: 'Zen Mandala 17 ', img_path: 'Zen/21.jpg' },
		{ name: 'Zen Mandala 18 ', img_path: 'Zen/22.jpg' },
		{ name: 'Zen Mandala 19 ', img_path: 'Zen/23.jpg' },
		{ name: 'Zen Lotus 2 ', img_path: 'Zen/24.jpg' },
		{ name: 'Zen YingYang ', img_path: 'Zen/25.jpg' },
		{ name: 'Zen Buhda 26 ', img_path: 'Zen/26.jpg' },
		{ name: 'Zen Lotus 3 ', img_path: 'Zen/27.jpg' },
		{ name: 'Zen Lotus 4 ', img_path: 'Zen/28.jpg' },
		{ name: 'Zen Lotus 5 ', img_path: 'Zen/29.jpg' },
		{ name: 'Zen Lotus 6 ', img_path: 'Zen/30.jpg' }
	];

	for (const img of imgsToInsert) {
		await db.insert(img_list).values(img).onConflictDoNothing();
		console.log(`Inserted image record: ${img.img_path}`);
	}

	console.log('Image seeding complete.');
	await client.close();
}
