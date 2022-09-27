import { Controller } from '@nestjs/common';
import { CmsService } from './cms.service';
// import { TextBlock } from './text-block.entity';

@Controller('cms')
export class CmsController {
  constructor(private cmsService: CmsService) {}

  // @Post('/text-block')
  // createTextBlock(): Promise<TextBlock> {
  //   return this.cmsService.createTextBlock();
  // }
}
