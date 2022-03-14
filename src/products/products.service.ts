import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Product as ProductInterface } from './product.model';
import { map } from 'rxjs/operators';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsRepository } from './products.repository';
import { ProductCategoryDto } from './dto/product-category.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {}

  getProducts(): Observable<AxiosResponse<ProductInterface[]>> {
    return this.httpService.get('https://fakestoreapi.com/products').pipe(
      map((res) => {
        if (!res.data) {
          throw new NotFoundException('Products not found');
        }
        return res.data;
      }),
    );
  }

  getProductById(id): Observable<AxiosResponse<ProductInterface[]>> {
    return this.httpService.get(`https://fakestoreapi.com/products/${id}`).pipe(
      map((res) => {
        if (!res.data) {
          throw new NotFoundException(`Product with id: ${id} not found`);
        }
        return res.data;
      }),
    );
  }

  createProduct(
    createProductDto: CreateProductDto,
    productCategoryDto: ProductCategoryDto,
  ): Promise<Product> {
    return this.productsRepository.createProduct(
      createProductDto,
      productCategoryDto,
    );
  }

  async getProductsFromDb(): Promise<Product[]> {
    const products = await this.productsRepository.findProducts();

    if (!products) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  async getProductByIdFromDb(id: number): Promise<Product> {
    const result = await this.productsRepository.findOneProduct(id);

    if (!result) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    return result;
  }

  async updateProduct(
    id: number,
    createProductDto: CreateProductDto,
    productCategoryDto: ProductCategoryDto,
  ): Promise<Product> {
    const result = await this.productsRepository.updateProduct(
      id,
      createProductDto,
      productCategoryDto,
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
