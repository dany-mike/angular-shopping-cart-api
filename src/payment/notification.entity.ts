import { ApiProperty } from '@nestjs/swagger';

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Payment } from './payment.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  body: string;

  @ApiProperty()
  @ManyToOne(() => Payment, (payment) => payment.id)
  payment: Payment;
}
