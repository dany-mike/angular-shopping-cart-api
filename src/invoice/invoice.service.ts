import { Injectable } from '@nestjs/common';
// import { AddressService } from 'src/address/address.service';
import * as PDFDocument from 'pdfkit';
import { Order } from 'src/order/order.entity';

@Injectable()
export class InvoiceService {
  async createInvoice(billingAddress, products, order: Order): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });
      doc.text(`Order n° ${order.id}`, 100, 30);
      doc.text(`Billing address:`, 100, 50);
      doc.text('City: ' + billingAddress.city, 150, 70);
      doc.text('PostalCode: ' + billingAddress.postalCode, 150, 90);
      doc.text(
        'Street: ' + billingAddress?.streetNumber + billingAddress.streetName,
        150,
        110,
      );
      doc.text('Country: ' + billingAddress.countryCode, 150, 130);
      doc.text('Price: ', 100, 150);
      doc.text('Total: ' + Number(order.totalPrice).toFixed(2) + '€', 150, 170);
      doc.text(
        'Subtotal: ' + Number(order.subtotal).toFixed(2) + '€',
        150,
        190,
      );
      doc.text('Tax: ' + Number(order.tax).toFixed(2) + '€', 150, 210);

      // TODO: add listing products in pdf v2

      doc.end();
      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }
}
