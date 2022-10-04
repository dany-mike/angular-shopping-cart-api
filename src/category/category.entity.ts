import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '../products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @Column()
  image: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @OneToMany(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
  })
  products: Product[];
}
