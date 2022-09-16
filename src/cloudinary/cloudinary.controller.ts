import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import RolesGuard from 'src/auth/guards/roles.guard';
import { CloudinaryService } from './cloudinary.service';
import { UploadImageDto } from './dto/uploadImage.dto';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  // @Post('')
  // @UseGuards(RolesGuard(Role.Admin))
  // @UseGuards(AuthGuard())
  // uploadImage(@Body() uploadImageDto: UploadImageDto) {
  //   return this.cloudinaryService.uploadImage(uploadImageDto);
  // }

  // @Get('')
  // @UseGuards(RolesGuard(Role.Admin))
  // @UseGuards(AuthGuard())
  // getImages() {
  //   return this.cloudinaryService.getImages();
  // }

  // @Get('transform')
  // @UseGuards(RolesGuard(Role.Admin))
  // @UseGuards(AuthGuard())
  // getFormattedImage(): Promise<string> {
  //   return this.cloudinaryService.formatImage();
  // }
}
