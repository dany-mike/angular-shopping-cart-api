import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Quantity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  quantity: number;

  // Add many to many below
  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ApiProperty()
  @ManyToOne(() => Order, (order) => order.id, { onDelete: 'CASCADE' })
  order: Order;
}
