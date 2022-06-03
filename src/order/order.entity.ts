import { ApiProperty } from '@nestjs/swagger';
import { BillingAddress } from 'src/address/billingAddress.entity';
import { ShippingAddress } from 'src/address/shippingAddress.entity';
import { User } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

enum Status {
  CREATED = 'CREATED',
  COMPLETED = 'COMPLETED',
  PAID = 'PAID',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // Many to many
  @ApiProperty()
  @Column()
  quantities: any;

  // Many to many
  @ApiProperty()
  @Column()
  products: any;

  @ApiProperty()
  @Column()
  @ManyToOne(() => BillingAddress, (billingAddress) => billingAddress.id)
  billingAddress: BillingAddress;

  @ApiProperty()
  @Column()
  @ManyToOne(() => ShippingAddress, (shippingAddress) => shippingAddress.id)
  shippingAddress: ShippingAddress;

  @ApiProperty()
  @Column()
  status: Status;

  @ApiProperty()
  @Column()
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ApiProperty()
  @Column()
  totalPrice: number;
}
