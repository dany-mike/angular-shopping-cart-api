import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}
  @Get('invoice/:userToken/:orderId')
  async sendInvoice(
    @Param('userToken') userToken: string,
    @Param('orderId') orderId: number,
    @Res() res: Response,
  ) {
    this.emailService.sendInvoice(userToken, orderId, res);
  }
}
