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
      let y = 50;
      doc.fontSize(18);
      doc.text(`Invoice for order n° ${order.id}`, 100, y);
      doc.fontSize(12);
      y += 50;
      doc.text(`Billing address:`, 100, y);
      y += 20;
      doc.text('City: ' + billingAddress.city, 150, y);
      y += 20;
      doc.text('PostalCode: ' + billingAddress.postalCode, 150, y);
      y += 20;
      doc.text(
        'Street: ' + billingAddress?.streetNumber + billingAddress.streetName,
        150,
        y,
      );
      y += 20;
      doc.text('Country: ' + billingAddress.countryCode, 150, y);
      y += 20;
      doc.text('Price: ', 100, y);
      y += 20;
      doc.text('Total: ' + Number(order.totalPrice).toFixed(2) + '€', 150, y);
      y += 20;
      doc.text('Subtotal: ' + Number(order.subtotal).toFixed(2) + '€', 150, y);
      y += 20;
      doc.text('Tax: ' + Number(order.tax).toFixed(2) + '€', 150, y);
      y += 20;
      doc.text('Products list: ', 100, y);
      y += 20;
      products.forEach((product) => {
        doc.text(
          'Id: ' +
            product.id +
            ' | Name: ' +
            product.name +
            ' | Price: ' +
            Number(product.price).toFixed(2) +
            '€ ' +
            ' | Quantity: *' +
            product.quantity,
          150,
          y,
        );
        y += 20;
      });
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
