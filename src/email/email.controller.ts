import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Role } from '../auth/enums/role.enum';
import RolesGuard from '../auth/guards/roles.guard';
import { IResetObject } from '../auth/interfaces/resetObject.interface';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { SendInvoiceDto } from './dtos/sendInvoice.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}
  @Post('invoice')
  // @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  async sendInvoice(
    @Body() sendInvoiceDto: SendInvoiceDto,
    @Res() res: Response,
  ) {
    this.emailService.sendInvoice(sendInvoiceDto, res);
  }

  @Post('/reset-link')
  sendResetPasswordLink(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<IResetObject> {
    return this.emailService.sendResetPasswordLink(forgotPasswordDto);
  }
}
