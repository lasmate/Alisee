/**
 * API endpoint for exporting orders as PDF.
 * Generates PDF documents for individual orders with complete order details.
 */
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { orders } from '$lib/server/db/schema/Orders';
import { users } from '$lib/server/db/schema/Users';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import PDFDocument from 'pdfkit';

/**
 * Handles POST requests to export a specific order as PDF.
 * @return A PDF file response with order details or error message.
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { orderId } = await request.json();
		
		if (!orderId) {
			return json({ error: 'Order ID required' }, { status: 400 });
		}

		// Get order with user details
		const orderResult = await db
			.select({
				orderId: orders.id,
				userId: orders.userId,
				firstName: orders.firstName,
				lastName: orders.lastName,
				address: orders.address,
				city: orders.city,
				postalCode: orders.postalCode,
				country: orders.country,
				totalPrice: orders.totalPrice,
				items: orders.items,
				status: orders.status,
				createdAt: orders.createdAt,
				userEmail: users.email
			})
			.from(orders)
			.leftJoin(users, eq(orders.userId, users.id))
			.where(eq(orders.id, orderId))
			.limit(1);

		if (orderResult.length === 0) {
			return json({ error: 'Order not found' }, { status: 404 });
		}

		const order = orderResult[0];
		const parsedItems = JSON.parse(order.items);

		// Generate proper PDF binary content
		const pdfBuffer = await generatePDFWithKit(order, parsedItems);
		
		return new Response(new Uint8Array(pdfBuffer), {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="commande-${orderId}.pdf"`,
				'Content-Length': pdfBuffer.length.toString()
			}
		});

	} catch (error) {
		console.error('Error exporting order:', error);
		return json({ error: 'Failed to export order' }, { status: 500 });
	}
};

function generatePDFWithKit(order: any, items: any[]): Promise<Buffer> {
	return new Promise((resolve) => {
		const doc = new PDFDocument();
		const buffers: Buffer[] = [];

		doc.on('data', buffers.push.bind(buffers));
		doc.on('end', () => {
			const pdfData = Buffer.concat(buffers);
			resolve(pdfData);
		});

		// Add content to PDF
		doc.fontSize(20).text(`FACTURE - COMMANDE #${order.orderId}`, 50, 50);
		
		const formattedDate = new Date(order.createdAt).toLocaleDateString('fr-FR');
		doc.fontSize(12).text(`Date: ${formattedDate}`, 50, 90);
		doc.text(`Statut: ${order.status}`, 50, 110);

		doc.fontSize(16).text('INFORMATIONS CLIENT', 50, 150);
		doc.fontSize(10)
			.text(`Nom: ${order.firstName} ${order.lastName}`, 50, 180)
			.text(`Email: ${order.userEmail || 'N/A'}`, 50, 200)
			.text(`Adresse: ${order.address}`, 50, 220)
			.text(`Ville: ${order.city} ${order.postalCode}`, 50, 240)
			.text(`Pays: ${order.country}`, 50, 260);

		doc.fontSize(16).text('ARTICLES COMMANDÉS', 50, 300);
		
		let yPosition = 330;
		items.forEach((item) => {
			const itemTotal = (item.price * item.quantity).toFixed(2);
			doc.fontSize(10).text(
				`${item.name} x${item.quantity} - ${itemTotal}€`,
				50,
				yPosition
			);
			yPosition += 20;
		});

		const formattedTotal = order.totalPrice.toFixed(2);
		doc.fontSize(14).text(`TOTAL: ${formattedTotal}€`, 50, yPosition + 20);
		doc.fontSize(10).text('Merci pour votre commande !', 50, yPosition + 60);

		doc.end();
	});
}
