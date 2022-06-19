import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Module({
  exports: [InvoiceService],
  providers: [InvoiceService],
})
export class InvoiceModule {}
