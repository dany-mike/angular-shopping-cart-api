import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  streetName: string;

  @ApiProperty()
  @Column()
  streetNumber: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  postalCode: string;

  @ApiProperty()
  @Column()
  countryCode: string;

  //   @Column()
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
