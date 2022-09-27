import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

@Module({
  controllers: [CmsController],
  imports: [TypeOrmModule.forFeature([])],
  providers: [CmsService],
})
export class CmsModule {}
