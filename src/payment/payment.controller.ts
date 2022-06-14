import { Body, Controller, Post } from '@nestjs/common';
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
}
