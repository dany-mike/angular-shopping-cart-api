import { Module } from '@nestjs/common';
import { QuantityService } from './quantity.service';
import { QuantityController } from './quantity.controller';

@Module({
  providers: [QuantityService],
  controllers: [QuantityController]
})
export class QuantityModule {}
