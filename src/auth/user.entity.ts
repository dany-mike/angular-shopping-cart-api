import { BillingAddress } from 'src/address/billingAddress.entity';
import { ShippingAddress } from 'src/address/shippingAddress.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from './enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 255 })
  firstname: string;

  @Column({ length: 255 })
  lastname: string;

  @Column({
    default: '0',
  })
  resetToken: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => ShippingAddress, (shippingAddress) => shippingAddress.id)
  shippingAddress: ShippingAddress[];

  @OneToMany(() => BillingAddress, (billingAddress) => billingAddress.id)
  billingAddress: BillingAddress[];
}
