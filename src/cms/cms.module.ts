import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesModule } from '../pages/pages.module';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { TextBlock } from './text-block.entity';
import { TextBlockRepository } from './text-block.repository';

@Module({
  controllers: [CmsController],
  imports: [
    TypeOrmModule.forFeature([TextBlock, TextBlockRepository]),
    forwardRef(() => PagesModule),
  ],
  providers: [CmsService],
  exports: [CmsService],
})
export class CmsModule {}
