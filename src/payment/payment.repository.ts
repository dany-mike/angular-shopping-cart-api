import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { PaymentIntentDto } from './dto/paymentIntents.dto';
import { Payment, Status } from './payment.entity';

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {
  createPaymentIntent = async (
    paymentDto: PaymentIntentDto,
    status: Status,
  ): Promise<Payment> => {
    const paymentIntent = await this.create({
      status,
      paymentIntentId: '',
    });

    await this.save(paymentIntent);

    return paymentIntent;
  };

  updatePaymentIntent = async (
    paymentId: number,
    paymentIntentId: string,
  ): Promise<Payment> => {
    const result = await this.findOne(paymentId);

    if (!result) {
      throw new BadRequestException(`Payment ${paymentId} not found`);
    }
    return this.save({
      status: result.status,
      paymentIntentId,
      id: result.id,
    });
  };

  updateStatus = async (event: any, status: Status): Promise<Payment> => {
    const result = await this.findOne({
      where: {
        paymentIntentId: event.data.object.payment_intent,
      },
    });

    console.log(event.data.object.payment_intent);

    console.log('RESULT', result);

    if (!result) {
      throw new BadRequestException(
        `Payment intent id ${event.data.object.payment_intent} not found`,
      );
    }
    return this.save({
      status,
      paymentIntentId: result.paymentIntentId,
      id: result.id,
    });
  };
}
