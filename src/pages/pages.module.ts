import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsModule } from 'src/cms/cms.module';
import { Page } from './page.entity';
import { PagesController } from './pages.controller';
import { PagesRepository } from './pages.repository';
import { PagesService } from './pages.service';

@Module({
  controllers: [PagesController],
  imports: [
    TypeOrmModule.forFeature([Page, PagesRepository]),
    forwardRef(() => CmsModule),
  ],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
