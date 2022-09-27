import { Injectable } from '@nestjs/common';

@Injectable()
export class CmsService {
  createTextBlock() {
    console.log('Create text block');
  }
}
