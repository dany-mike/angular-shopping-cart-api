import { Module } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';
import { InvoiceController } from './invoice.controller';

@Module({
  controllers: [InvoiceController],
  imports: [AddressService],
})
export class InvoiceModule {}
