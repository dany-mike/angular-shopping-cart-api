import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';
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
    // TODO: Remove duplicate when I handle stocks
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
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const result = await this.productsRepository.findOneProduct(id);

    if (!result) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

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
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    return result;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productsRepository.deleteProduct(id);

    if (!result) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
  }
}
