import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import RolesGuard from 'src/auth/guards/roles.guard';
import { AddressService } from './address.service';
import { BillingAddress } from './billingAddress.entity';
import { AddressDto } from './dto/address.dto';
import { ShippingAddress } from './shippingAddress.entity';

// TODO: add acl
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post('shipping')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  addShippingAddress(@Body() addressDto: AddressDto): Promise<ShippingAddress> {
    return this.addressService.addShippingAddress(addressDto);
  }

  @Post('billing')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  addBillingAddress(@Body() addressDto: AddressDto): Promise<BillingAddress> {
    return this.addressService.addBillingAddress(addressDto);
  }

  @Get('shipping/:userId')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  getShippingAddresses(
    @Param('userId') userId: string,
  ): Promise<ShippingAddress[]> {
    return this.addressService.getShippingAddresses(userId);
  }

  @Get('shipping/:userId/:addressId')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  getShippingAddressById(
    @Param('userId') userId: string,
    @Param('addressId') addressId: number,
  ): Promise<ShippingAddress> {
    return this.addressService.getShippingAddressById(userId, addressId);
  }

  @Get('billing/:userId')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  getBillingAddresses(
    @Param('userId') userId: string,
  ): Promise<BillingAddress[]> {
    return this.addressService.getBillingAddresses(userId);
  }

  @Get('billing/:userId/:addressId')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  getBillingAddressById(
    @Param('userId') userId: string,
    @Param('addressId') addressId: number,
  ): Promise<BillingAddress> {
    return this.addressService.getBillingAddressById(userId, addressId);
  }

  // TODO: Add authorization here and below by creating a getUserByToken method in auth.controller.ts
  @Put('shipping/:id')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  updateShippingAddress(
    @Param('id') id: number,
    @Body() addressDto: AddressDto,
  ): Promise<ShippingAddress> {
    return this.addressService.updateShippingAddress(id, addressDto);
  }

  @Put('billing/:id')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  updateBillingAddress(
    @Param('id') id: number,
    @Body() addressDto: AddressDto,
  ): Promise<BillingAddress> {
    return this.addressService.updateBillingAddress(id, addressDto);
  }

  @Delete('shipping/:id')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  deleteShippingAddress(@Param('id') id: number): Promise<ShippingAddress> {
    return this.addressService.deleteShippingAddress(id);
  }

  @Delete('billing/:id')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  deleteBillingAddress(@Param('id') id: number): Promise<BillingAddress> {
    return this.addressService.deleteBillingAddress(id);
  }
}
