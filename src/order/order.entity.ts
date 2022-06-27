import { ApiProperty } from '@nestjs/swagger';
import { BillingAddress } from 'src/address/billingAddress.entity';
import { ShippingAddress } from 'src/address/shippingAddress.entity';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { OrderItem } from './orderItem.entity';

export enum Status {
  CREATED = 'CREATED',
  COMPLETE = 'COMPLETE',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToMany(() => Product, { cascade: true })
  @JoinTable({
    name: 'order_product',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'order_id', referencedColumnName: 'id' },
  })
  products: Product[];

  @ApiProperty()
  @ManyToOne(() => BillingAddress, (billingAddress) => billingAddress.id, {
    onDelete: 'CASCADE',
  })
  billingAddress: BillingAddress;

  @ApiProperty()
  @ManyToOne(() => ShippingAddress, (shippingAddress) => shippingAddress.id, {
    onDelete: 'CASCADE',
  })
  shippingAddress: ShippingAddress;

  @ApiProperty()
  @ManyToMany(() => OrderItem, (orderItem) => orderItem.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'order_orderItems',
    joinColumn: { name: 'orderItem_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'order_id', referencedColumnName: 'id' },
  })
  orderItems: OrderItem[];

  @ApiProperty()
  @Column()
  status: Status;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ApiProperty()
  @Column({ type: 'decimal' })
  totalPrice: number;

  @ApiProperty()
  @Column({ type: 'decimal' })
  subtotal: number;

  @ApiProperty()
  @Column({ type: 'decimal' })
  tax: number;
}
