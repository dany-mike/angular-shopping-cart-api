import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.category)
  productId: number;

  @ApiProperty()
  @OneToOne(() => User, (user) => user.id)
  userId: number;
}
