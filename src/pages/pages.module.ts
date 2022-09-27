import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  controllers: [PagesController],
  imports: [TypeOrmModule.forFeature([])],
  providers: [PagesService],
})
export class PagesModule {}
