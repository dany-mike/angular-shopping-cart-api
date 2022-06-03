import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { BillingAddress } from './billingAddress.entity';
import { AddressDto } from './dto/address.dto';
import { ShippingAddress } from './shippingAddress.entity';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

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

  @Get('billing/:userId')
  getBillingAddresses(
    @Param('userId') userId: string,
  ): Promise<BillingAddress[]> {
    return this.addressService.getBillingAddresses(userId);
  }

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
}
