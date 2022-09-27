import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { PagesController } from './pages.controller';
import { PagesRepository } from './pages.repository';
import { PagesService } from './pages.service';

@Module({
  controllers: [PagesController],
  imports: [TypeOrmModule.forFeature([Page, PagesRepository])],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
