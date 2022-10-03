import { Body, Controller, Post } from '@nestjs/common';
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
}
