import { Category } from './category.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  createCategory = async (
    categoryDto: CreateCategoryDto,
  ): Promise<Category> => {
    const { name, image } = categoryDto;

    const isExist = await this.find({ where: { name } });

    if (isExist.length >= 1) {
      throw new BadRequestException(`Category ${name} already exist`);
    }

    const category = this.create({
      name,
      image: image ? image : '',
    });

    await this.save(category);
    return category;
  };

  findOneCategory = async (id: number): Promise<Category> => {
    return this.findOne(id);
  };

  findCategories = async (): Promise<Category[]> => {
    return this.find();
  };

  updateCategory = async (
    id: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> => {
    const result = await this.findOne(id);

    if (!result) {
      return null;
    }
    return this.save({
      ...createCategoryDto,
      id,
    });
  };

  deleteCategory = async (id: number): Promise<Category> => {
    this.delete(id);
    return await this.findOne(id);
  };
}
