import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { IResetObject } from 'src/auth/interfaces/resetObject.interface';
import { InvoiceService } from 'src/invoice/invoice.service';
import { OrderService } from 'src/order/order.service';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { SendInvoiceDto } from './dtos/sendInvoice.dto';

@Injectable()
export class EmailService {
  constructor(
    private mailService: MailerService,
    private invoiceService: InvoiceService,
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  async sendInvoice(sendInvoiceDto: SendInvoiceDto, res: Response) {
    const { userToken, orderId, orderItemsDto } = sendInvoiceDto;

    const user = await this.authService.getUserByToken(userToken);

    const order = await this.orderService.getOrderBillingAddress(orderId, user);

    const invoice = await this.invoiceService.createInvoice(
      order.billingAddress,
      orderItemsDto,
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
        text: `Thank you ${order.user.firstname} ! Order n° ${orderId} has been registered ! Order is on the way 🎉`,
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

  async sendResetPasswordLink(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<IResetObject> {
    const { email } = forgotPasswordDto;

    const user = await this.authService.findUserByEmail(email);

    const resetObj: IResetObject = await this.authService.saveResetToken(user);

    await this.mailService.sendMail({
      to: user.email,
      from: 'ecommercedanymike@gmail.com',
      subject: `Reset password`,
      html: `
        <h3>Hello ${user.firstname}!</h3>
        <p>Please use this <a href="${resetObj.resetLink}">link</a> to reset your password.</p>
    `,
    });

    return resetObj;
  }
}
