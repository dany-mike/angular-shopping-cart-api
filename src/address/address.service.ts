import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.entity';
import { BillingAddress } from './billingAddress.entity';
import { BillingAddressRepository } from './billingAddress.repository';
import { AddressDto } from './dto/address.dto';
import { ShippingAddress } from './shippingAddress.entity';
import { ShippingAddressRepository } from './shippingAddress.repository';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(ShippingAddressRepository)
    private shippingAddressRepository: ShippingAddressRepository,
    @InjectRepository(BillingAddressRepository)
    private billingAddressRepository: BillingAddressRepository,
    private authService: AuthService,
  ) {}

  async addShippingAddress(addressDto: AddressDto): Promise<ShippingAddress> {
    const user = await this.getUser(addressDto);
    return this.shippingAddressRepository.addShippingAddress(addressDto, user);
  }

  async addBillingAddress(addressDto: AddressDto): Promise<BillingAddress> {
    const user = await this.getUser(addressDto);
    return this.billingAddressRepository.addBillingAddress(addressDto, user);
  }

  private async getUser(addressDto: AddressDto): Promise<User> {
    const { userId } = addressDto;

    const user: User = await this.authService.getUserByid(userId);

    if (!user) {
      throw new BadRequestException(`User with id: ${userId} does not exist`);
    }

    return user;
  }

  async getShippingAddresses(userId: string): Promise<ShippingAddress[]> {
    const user: User = await this.authService.getUserByid(userId);

    return await this.shippingAddressRepository.find({
      where: {
        user,
      },
    });
  }

  async getBillingAddresses(userId: string): Promise<BillingAddress[]> {
    const user: User = await this.authService.getUserByid(userId);

    return await this.billingAddressRepository.find({
      where: {
        user,
      },
    });
  }

  async getBillingAddressById(
    userId: string,
    addressId: number,
  ): Promise<BillingAddress> {
    const user: User = await this.authService.getUserByid(userId);

    const address = await this.billingAddressRepository.findOne({
      where: {
        user,
        id: addressId,
      },
    });

    if (!address) {
      throw new BadRequestException(
        `Billing address with id: ${addressId} not found`,
      );
    }

    return address;
  }

  async getShippingAddressById(
    userId: string,
    addressId: number,
  ): Promise<ShippingAddress> {
    const user: User = await this.authService.getUserByid(userId);

    const address = await this.shippingAddressRepository.findOne({
      where: {
        user,
        id: addressId,
      },
    });

    if (!address) {
      throw new BadRequestException(
        `Shipping address with id: ${addressId} not found`,
      );
    }

    return address;
  }

  updateShippingAddress(
    id: number,
    addressDto: AddressDto,
  ): Promise<ShippingAddress> {
    return this.shippingAddressRepository.updateShippingAddress(id, addressDto);
  }

  updateBillingAddress(
    id: number,
    addressDto: AddressDto,
  ): Promise<BillingAddress> {
    return this.billingAddressRepository.updateBillingAddress(id, addressDto);
  }

  async deleteBillingAddress(id: number): Promise<BillingAddress> {
    const address = await this.billingAddressRepository.findOne(id);

    if (!address) {
      throw new BadRequestException(`Billing address with id: ${id} not found`);
    }

    await this.billingAddressRepository.delete(address.id);
    return address;
  }

  async deleteShippingAddress(id: number): Promise<ShippingAddress> {
    const address = await this.shippingAddressRepository.findOne({
      where: { id: id },
    });

    if (!address) {
      throw new BadRequestException(
        `Shipping address with id: ${id} not found`,
      );
    }

    await this.shippingAddressRepository.delete(address.id);
    return address;
  }
}
