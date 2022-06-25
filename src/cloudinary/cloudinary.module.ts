import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [CloudinaryService],
  controllers: [CloudinaryController],
  imports: [AuthModule, PassportModule],
})
export class CloudinaryModule {}
