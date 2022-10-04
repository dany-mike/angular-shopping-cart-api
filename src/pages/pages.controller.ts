import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TextBlock } from '../cms/text-block.entity';
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

  @Get('text-blocks/:name')
  getPageTextBlock(@Param('name') name: string): Promise<TextBlock[]> {
    return this.pagesService.getPageTextBlocks(name);
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
