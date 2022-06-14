import { ApiProperty } from '@nestjs/swagger';

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
