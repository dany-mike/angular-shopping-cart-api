import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/enums/role.enum';
import RolesGuard from '../auth/guards/roles.guard';
import RequestWithRawBody from '../interface/requestWithRawBody.interface';
import { PaymentIntentDto } from './dto/paymentIntents.dto';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // @Post()
  // @UseGuards(RolesGuard(Role.User))
  // @UseGuards(AuthGuard())
  // createPaymentIntent(@Body() orderId: PaymentIntentDto): Promise<Payment> {
  //   return this.paymentService.createPaymentIntent(orderId);
  // }

  @Post('webhook')
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody,
    @Body() body,
  ) {
    let event;

    if (process.env.NODE_ENV === 'production') {
      if (!signature) {
        throw new BadRequestException('Missing stripe-signature header');
      }

      event = await this.paymentService.constructEventFromPayload(
        signature,
        request.rawBody,
      );
    }

    if (process.env.NODE_ENV === 'dev') {
      event = body;
    }

    await this.paymentService.handleEvent(event);
  }
}
