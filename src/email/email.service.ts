import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class EmailService {
  constructor(
    private mailService: MailerService,
    private invoiceService: InvoiceService,
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  async sendInvoice(userToken: string, orderId: number, res: Response) {
    const user = await this.authService.getUserByToken(userToken);

    const order = await this.orderService.getOrderBillingAddress(orderId, user);

    const invoice = await this.invoiceService.createInvoice(
      order.billingAddress,
      order.products,
      order,
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': invoice.length,
    });

    await this.mailService
      .sendMail({
        to: user.email,
        from: 'ecommercedanymike@gmail.com',
        subject: `Order n° ${orderId}`,
        text: `Order n° ${orderId} has been created successfuly ! Order is on the way 🎉`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        attachments: [
          {
            content: invoice,
            filename: `order${orderId}.pdf`,
            type: 'application/pdf',
            disposition: 'attachment',
          },
        ],
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => console.log(err));
  }
}
