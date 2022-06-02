import { User } from 'src/auth/user.entity';
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
}
