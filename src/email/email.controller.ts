import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Role } from 'src/auth/enums/role.enum';
import RolesGuard from 'src/auth/guards/roles.guard';
import { IResetObject } from 'src/auth/interfaces/resetObject.interface';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}
  @Get('invoice/:userToken/:orderId')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  async sendInvoice(
    @Param('userToken') userToken: string,
    @Param('orderId') orderId: number,
    @Res() res: Response,
  ) {
    this.emailService.sendInvoice(userToken, orderId, res);
  }

  @Post('/reset-link')
  sendResetPasswordLink(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<IResetObject> {
    return this.emailService.sendResetPasswordLink(forgotPasswordDto);
  }
}
