import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, CategoryRepository]),
    AuthModule,
  ],
  controllers: [CategoryController],
  exports: [CategoryService],
  providers: [CategoryService],
})
export class CategoryModule {}
