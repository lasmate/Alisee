import 'dotenv/config';
import { seedItem } from './seedItem.ts';
import { seedUser } from './seedUser.ts';
import { seedImg } from './seedImg.ts';

async function main() {
	try {
		await seedItem();
		await seedUser();
		await seedImg();
		console.log('All seeding complete.');
		process.exit(0);
	} catch (err) {
		console.error('Global seeding failed:', err);
		process.exit(1);
	}
}

main();
