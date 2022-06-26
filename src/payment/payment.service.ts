import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { OrderService } from 'src/order/order.service';
import { Stripe } from 'stripe';
import { PaymentIntentDto } from './dto/paymentIntents.dto';
import { NotificationRepository } from './notification.repository';
import { Payment, Status } from './payment.entity';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  private stripe;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
    @InjectRepository(NotificationRepository)
    private notificationRepository: NotificationRepository,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  public async constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );

    this.notificationRepository.createNotification(event);

    return event;
  }

  async createPaymentIntent(
    paymentIntentDto: PaymentIntentDto,
  ): Promise<Payment> {
    const { orderId, userToken } = paymentIntentDto;

    const user = await this.authService.getUserByToken(userToken);

    const order = await this.orderService.getOrderById(orderId, user);

    const payment = await this.paymentRepository.createPaymentIntent(
      paymentIntentDto,
      Status.CREATED,
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

  async handleEvent(event) {
    switch (event.type) {
      case 'payment_intent.created':
        await this.setPaymentStatus(event, Status.CREATED);
      case 'payment_intent.succeeded':
        await this.setPaymentStatus(event, Status.PROCESSING);
        break;
      case 'charge.succeeded':
        await this.setPaymentStatus(event, Status.SUCCEEDED);
        break;
      case 'payment_intent.canceled':
        await this.setPaymentStatus(event, Status.FAILED);
        break;
      case 'payment_intent.payment_failed':
        await this.setPaymentStatus(event, Status.FAILED);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return 'Success';
  }

  stripeFormattedPrice(order): number {
    const stripeFormattedPrice: number = order.totalPrice * 100;
    return Number(stripeFormattedPrice.toFixed(0));
  }

  async setPaymentStatus(event, status: Status) {
    await this.paymentRepository.updateStatus(event, status);
  }
}
