import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from 'src/category/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'real' })
  price: number;

  @ApiProperty()
  @ApiPropertyOptional()
  @Column()
  description: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @Column()
  image: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
