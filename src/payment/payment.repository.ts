import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { PaymentIntentDto } from './dto/paymentIntents.dto';
import { Payment } from './payment.entity';

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {
  createPaymentIntent = async (
    paymentDto: PaymentIntentDto,
  ): Promise<Payment> => {
    const { status } = paymentDto;

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
}
