import { Injectable } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class InvoiceService {
  constructor(private addressService: AddressService) {}

  async createInvoice() {
    console.log('create invoice');
  }
}
