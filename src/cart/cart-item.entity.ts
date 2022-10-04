import { ApiProperty } from '@nestjs/swagger';
import { User } from '../auth/user.entity';
import { Product } from '../products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ApiProperty()
  @Column({ type: 'real' })
  quantity: number;
}
