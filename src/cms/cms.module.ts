import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesModule } from 'src/pages/pages.module';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { TextBlock } from './text-block.entity';
import { TextBlockRepository } from './text-block.repository';

@Module({
  controllers: [CmsController],
  imports: [
    TypeOrmModule.forFeature([TextBlock, TextBlockRepository]),
    PagesModule,
  ],
  providers: [CmsService],
})
export class CmsModule {}
