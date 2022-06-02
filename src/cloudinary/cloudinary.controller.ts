import { Body, Controller, Get, Post } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { UploadImageDto } from './dto/uploadImage.dto';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('')
  uploadImage(@Body() uploadImageDto: UploadImageDto) {
    return this.cloudinaryService.uploadImage(uploadImageDto);
  }

  @Get('')
  getImages() {
    return this.cloudinaryService.getImages();
  }

  @Get('transform')
  getFormattedImage(): Promise<string> {
    return this.cloudinaryService.formatImage();
  }
}
