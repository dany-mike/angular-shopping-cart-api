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

  // TODO: add authorization here and below
  async addShippingAddress(addressDto: AddressDto): Promise<ShippingAddress> {
    const user = await this.getUser(addressDto);
    return this.shippingAddressRepository.addShippingAddress(addressDto, user);
  }

  async addBillingAddress(addressDto: AddressDto): Promise<BillingAddress> {
    const user = await this.getUser(addressDto);
    return this.billingAddressRepository.addBillingAddress(addressDto, user);
  }

  private async getUser(addressDto: AddressDto) {
    const { userId } = addressDto;

    const user: User = await this.authService.getUserByid(userId);

    if (!user) {
      throw new BadRequestException(`User with id: ${userId} does not exist`);
    }

    return user;
  }

  async getShippingAddresses(userId: string) {
    const user: User = await this.authService.getUserByid(userId);

    return await this.shippingAddressRepository.find({
      where: {
        user,
      },
    });
  }

  async getBillingAddresses(userId: string) {
    const user: User = await this.authService.getUserByid(userId);

    return await this.billingAddressRepository.find({
      where: {
        user,
      },
    });
  }

  // TODO: Add authorization here and below by creating a getUserByToken method in auth.controller.ts
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
}
