import { Controller, Post } from '@nestjs/common';
import { CmsService } from './cms.service';

@Controller('cms')
export class CmsController {
  constructor(private cmsService: CmsService) {}

  @Post('/text-block')
  createTextBlock() {
    this.cmsService.createTextBlock();
  }
}
