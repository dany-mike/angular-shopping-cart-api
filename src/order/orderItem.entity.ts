import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @IsString()
  name: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  @IsNumber()
  price: number;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsString()
  @Column()
  image: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsNumber()
  @Column()
  quantity: number;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsNumber()
  @Column()
  orderId: number;

  @ApiProperty()
  @ManyToOne(() => Order, (order) => order.id, {
    onDelete: 'CASCADE',
  })
  order: Order;
}
