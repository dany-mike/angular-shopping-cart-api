import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from 'src/order/order.service';
import { Stripe } from 'stripe';
import { PaymentIntentDto } from './dto/paymentIntents.dto';
import { Payment } from './payment.entity';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  private stripe;

  constructor(
    private orderService: OrderService,
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  async createPaymentIntent(
    paymentIntentDto: PaymentIntentDto,
  ): Promise<Payment> {
    const { orderId } = paymentIntentDto;
    const order = await this.orderService.getOrderById(orderId);

    const payment = await this.paymentRepository.createPaymentIntent(
      paymentIntentDto,
    );

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: this.stripeFormattedPrice(order),
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_id: order.id,
        payment_id: payment.id,
      },
    });

    await this.paymentRepository.updatePaymentIntent(
      payment.id,
      paymentIntent.id,
    );

    return paymentIntent;
  }

  stripeFormattedPrice(order): number {
    return order.totalPrice * 100;
  }
}
