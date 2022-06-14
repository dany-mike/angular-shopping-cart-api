import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
  Req,
} from '@nestjs/common';
import RequestWithRawBody from 'src/interface/requestWithRawBody.interface';
import { PaymentIntentDto } from './dto/paymentIntents.dto';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  createPaymentIntent(@Body() orderId: PaymentIntentDto): Promise<Payment> {
    return this.paymentService.createPaymentIntent(orderId);
  }

  @Post('webhook')
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const event = await this.paymentService.constructEventFromPayload(
      signature,
      request.rawBody,
    );

    await this.paymentService.handleEvent(event);
  }
}
