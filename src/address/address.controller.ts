import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from './address.service';
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
  addBillingAddress(@Body() addressDto: AddressDto): Promise<ShippingAddress> {
    return this.addressService.addBillingAddress(addressDto);
  }
}
