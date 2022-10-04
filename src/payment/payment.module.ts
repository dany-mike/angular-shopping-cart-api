import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';
import { Payment } from './payment.entity';
import { PaymentRepository } from './payment.repository';
import { NotificationRepository } from './notification.repository';
import { Notification } from './notification.entity';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      PaymentRepository,
      Notification,
      NotificationRepository,
    ]),
    OrderModule,
    AuthModule,
    PassportModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
