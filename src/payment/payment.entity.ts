import { ApiProperty } from '@nestjs/swagger';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notification } from './notification.entity';

export enum Status {
  SUCCEEDED = 'SUCCEEDED',
  PROCESSING = 'PROCESSING',
  FAILED = 'FAILED',
  CREATED = 'CREATED',
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  status: Status;

  @ApiProperty()
  @Column()
  paymentIntentId: string;

  @ApiProperty()
  @OneToMany(() => Notification, (notification) => notification.id)
  notification: Notification;
}
