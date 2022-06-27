import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
