import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    const categories = await this.categoryRepository.find({ where: { name } });

    if (categories.length >= 1) {
      throw new BadRequestException(`Category ${name} already exist`);
    }

    return this.categoryRepository.createCategory(createCategoryDto);
  }

  async getCategories(): Promise<Category[]> {
    const products = await this.categoryRepository.findCategories();

    if (!products) {
      throw new NotFoundException('Categories not found');
    }

    return products;
  }

  async getCategoryById(id: number): Promise<Category> {
    const result = await this.categoryRepository.findOneCategory(id);

    if (!result) {
      throw new NotFoundException(`Category with id: ${id} not found`);
    }

    return result;
  }

  async updateCategory(
    id: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const result = await this.categoryRepository.updateCategory(
      id,
      createCategoryDto,
    );

    if (!result) {
      throw new NotFoundException(`Category with id: ${id} not found`);
    }

    return result;
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.deleteCategory(id);

    if (!result) {
      throw new NotFoundException(`Category with id: ${id} not found`);
    }
  }
}
