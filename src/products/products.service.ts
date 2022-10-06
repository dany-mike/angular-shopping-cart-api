import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    private categoryService: CategoryService,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId } = createProductDto;

    let category: Category;
    if (categoryId) {
      category = await this.categoryService.getCategoryById(categoryId);

      if (!category) {
        throw new BadRequestException(
          `Category with id: ${categoryId} does not exist`,
        );
      }
    }

    return this.productsRepository.createProduct(createProductDto, category);
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productsRepository.findProducts();

    if (!products) {
      throw new BadRequestException('Products not found');
    }

    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const result = await this.productsRepository.findOneProduct(id);

    if (!result) {
      throw new BadRequestException(`Product with id: ${id} not found`);
    }

    return result;
  }

  async findProductsByIds(id: number[]): Promise<Product[]> {
    const result = await this.productsRepository.findByIds(id);

    return result;
  }

  async getProductsByCategory(id: number) {
    const products = await this.productsRepository.find({
      where: { category: id },
    });

    return products;
  }

  async updateProduct(
    id: number,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const result = await this.productsRepository.updateProduct(
      id,
      createProductDto,
    );

    if (!result) {
      throw new BadRequestException(`Product with id: ${id} not found`);
    }

    return result;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productsRepository.deleteProduct(id);

    if (!result) {
      throw new BadRequestException(`Product with id: ${id} not found`);
    }
  }
}
