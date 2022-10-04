import { BadRequestException } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BillingAddress } from './billingAddress.entity';
import { AddressDto } from './dto/address.dto';

@EntityRepository(BillingAddress)
export class BillingAddressRepository extends Repository<BillingAddress> {
  addBillingAddress = async (
    addressDto: AddressDto,
    user: User,
  ): Promise<BillingAddress> => {
    const { city, countryCode, postalCode, streetName, streetNumber } =
      addressDto;

    const billingAddress = this.create({
      city,
      user,
      streetName,
      streetNumber,
      postalCode,
      countryCode,
    });

    await this.save(billingAddress);
    return billingAddress;
  };

  updateBillingAddress = async (
    id: number,
    addressDto: AddressDto,
  ): Promise<BillingAddress> => {
    const result = await this.findOne(id);
    if (!result) {
      throw new BadRequestException(`billing address with id: ${id} not found`);
    }
    return this.save({
      ...addressDto,
      id: result.id,
    });
  };
}
