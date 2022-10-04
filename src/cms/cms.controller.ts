import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { TextBlock } from './text-block.entity';

@Controller('cms')
export class CmsController {
  constructor(private cmsService: CmsService) {}

  @Post('/text-block')
  createTextBlock(
    @Body() createTextBlockDto: CreateTextBlockDto,
  ): Promise<TextBlock> {
    return this.cmsService.createTextBlock(createTextBlockDto);
  }

  @Put('/text-block/:id')
  updateTextBlock(
    @Param('id') id: number,
    @Body() createTextBlockDto: CreateTextBlockDto,
  ): Promise<TextBlock> {
    return this.cmsService.updateTextBlock(id, createTextBlockDto);
  }

  @Delete('/text-block/:id')
  deleteTextBlock(@Param('id') id: number): Promise<void> {
    return this.cmsService.deleteTextBlock(id);
  }
}
