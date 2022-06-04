import { ApiProperty } from '@nestjs/swagger';
import { BillingAddress } from 'src/address/billingAddress.entity';
import { ShippingAddress } from 'src/address/shippingAddress.entity';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';
import { Quantity } from 'src/quantity/quantity.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

export enum Status {
  CREATED = 'CREATED',
  COMPLETED = 'COMPLETED',
  PAID = 'PAID',
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
  @OneToMany(() => Quantity, (quantity) => quantity.id)
  quantity: Quantity;

  @ApiProperty()
  @ManyToOne(() => BillingAddress, (billingAddress) => billingAddress.id)
  billingAddress: BillingAddress;

  @ApiProperty()
  @ManyToOne(() => ShippingAddress, (shippingAddress) => shippingAddress.id)
  shippingAddress: ShippingAddress;

  @ApiProperty()
  @Column()
  status: Status;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ApiProperty()
  @Column()
  totalPrice: number;
}
