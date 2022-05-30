import { Body, Controller, Post } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { UploadImageDto } from './dto/uploadImage.dto';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('')
  uploadImage(@Body() uploadImageDto: UploadImageDto) {
    return this.cloudinaryService.uploadImage(uploadImageDto);
  }
}
