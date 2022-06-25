import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { BillingAddress } from './billingAddress.entity';
import { BillingAddressRepository } from './billingAddress.repository';
import { ShippingAddress } from './shippingAddress.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ShippingAddressRepository } from './shippingAddress.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShippingAddress,
      ShippingAddressRepository,
      BillingAddress,
      BillingAddressRepository,
    ]),
    AuthModule,
    PassportModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
