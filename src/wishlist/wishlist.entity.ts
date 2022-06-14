import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  Column,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  productId: number;

  @Column()
  @ApiProperty()
  @OneToOne(() => User, (user) => user.id)
  userId: string;
}
