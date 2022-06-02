import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddressDto } from './dto/address.dto';
import { ShippingAddress } from './shippingAddress.entity';

@EntityRepository(ShippingAddress)
export class ShippingAddressRepository extends Repository<ShippingAddress> {
  addShippingAddress = async (
    addressDto: AddressDto,
    user: User,
  ): Promise<ShippingAddress> => {
    const { city, countryCode, postalCode, streetName, streetNumber } =
      addressDto;

    const shippingAddress = this.create({
      city,
      user,
      streetName,
      streetNumber,
      postalCode,
      countryCode,
    });

    await this.save(shippingAddress);
    return shippingAddress;
  };
}
