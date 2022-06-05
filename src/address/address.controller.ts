import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { BillingAddress } from './billingAddress.entity';
import { AddressDto } from './dto/address.dto';
import { ShippingAddress } from './shippingAddress.entity';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  // TODO: add authorization here and below
  @Post('shipping')
  addShippingAddress(@Body() addressDto: AddressDto): Promise<ShippingAddress> {
    return this.addressService.addShippingAddress(addressDto);
  }

  @Post('billing')
  addBillingAddress(@Body() addressDto: AddressDto): Promise<BillingAddress> {
    return this.addressService.addBillingAddress(addressDto);
  }

  @Get('shipping/:userId')
  getShippingAddresses(
    @Param('userId') userId: string,
  ): Promise<ShippingAddress[]> {
    return this.addressService.getShippingAddresses(userId);
  }

  @Get('shipping/:userId/:addressId')
  getShippingAddressById(
    @Param('userId') userId: string,
    @Param('addressId') addressId: number,
  ): Promise<ShippingAddress> {
    return this.addressService.getShippingAddressById(userId, addressId);
  }

  @Get('billing/:userId')
  getBillingAddresses(
    @Param('userId') userId: string,
  ): Promise<BillingAddress[]> {
    return this.addressService.getBillingAddresses(userId);
  }

  @Get('billing/:userId/:addressId')
  getBillingAddressById(
    @Param('userId') userId: string,
    @Param('addressId') addressId: number,
  ): Promise<BillingAddress> {
    return this.addressService.getBillingAddressById(userId, addressId);
  }

  // TODO: Add authorization here and below by creating a getUserByToken method in auth.controller.ts
  @Put('shipping/:id')
  updateShippingAddress(
    @Param('id') id: number,
    @Body() addressDto: AddressDto,
  ): Promise<ShippingAddress> {
    return this.addressService.updateShippingAddress(id, addressDto);
  }

  @Put('billing/:id')
  updateBillingAddress(
    @Param('id') id: number,
    @Body() addressDto: AddressDto,
  ): Promise<BillingAddress> {
    return this.addressService.updateBillingAddress(id, addressDto);
  }

  @Delete('shipping/:id')
  deleteShippingAddress(@Param('id') id: number): Promise<ShippingAddress> {
    return this.addressService.deleteShippingAddress(id);
  }

  @Delete('billing/:id')
  deleteBillingAddress(@Param('id') id: number): Promise<BillingAddress> {
    return this.addressService.deleteBillingAddress(id);
  }
}
