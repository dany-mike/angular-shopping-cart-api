import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IResetObject } from 'src/auth/interfaces/resetObject.interface';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
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

  @Post('/forgot-password')
  forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<IResetObject> {
    return this.emailService.forgotPassword(forgotPasswordDto);
  }
}
