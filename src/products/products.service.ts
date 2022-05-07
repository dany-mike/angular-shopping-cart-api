import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {}

  createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productsRepository.createProduct(createProductDto);
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
