import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';
import { UploadImageDto } from './dto/uploadImage.dto';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    uploadImageDto: UploadImageDto,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const { file, publicId } = uploadImageDto;
    return v2.uploader.upload(
      file,
      { folder: 'ecommerce', public_id: publicId },
      function (error, result) {
        console.log(result, error);
      },
    );
  }
  async getImages(): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return v2.search
      .expression('ecommerce')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();
  }

  async formatImage(): Promise<string> {
    return v2.image('ecommerce/abs.png', {
      transformation: [{ width: 150, height: 150 }],
    });
  }
}
