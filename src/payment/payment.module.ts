import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/order/order.module';
import { Payment } from './payment.entity';
import { PaymentRepository } from './payment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentRepository]),
    OrderModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
