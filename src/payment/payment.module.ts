import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/order/order.module';
import { Payment } from './payment.entity';
import { PaymentRepository } from './payment.repository';
import { NotificationRepository } from './notification.repository';
import { Notification } from './notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      PaymentRepository,
      Notification,
      NotificationRepository,
    ]),
    OrderModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
