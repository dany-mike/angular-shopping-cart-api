import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';
import { UploadImageDto } from './dto/uploadImage.dto';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    uploadImageDto: UploadImageDto,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const { file } = uploadImageDto;
    return v2.uploader.upload(file, function (error, result) {
      console.log(result, error);
    });
  }
}
