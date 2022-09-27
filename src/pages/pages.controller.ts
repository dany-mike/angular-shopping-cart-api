import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.entity';
import { PagesService } from './pages.service';

// TODO: add a specific role to allow change on pages
@Controller('pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @Get('')
  getPages(): Promise<Page[]> {
    return this.pagesService.getPages();
  }

  @Post('')
  createPage(@Body() createPageDto: CreatePageDto): Promise<Page> {
    return this.pagesService.createPage(createPageDto);
  }

  @Delete(':id')
  deletePageById(@Param('id') id: number): Promise<void> {
    return this.pagesService.deletePage(id);
  }
}
