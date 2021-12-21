import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Product } from './product.model';
import { map } from 'rxjs/operators';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './products.repository';
import { ProductCategoryDto } from './dto/product-category.dto';

@Injectable()
export class ProductsService {
  constructor(
    private httpService: HttpService,
    private productRepository: ProductRepository,
  ) {}

  getProducts(): Observable<AxiosResponse<Product[]>> {
    return this.httpService.get('https://fakestoreapi.com/products').pipe(
      map((res) => {
        if (!res.data) {
          throw new NotFoundException('Products not found');
        }
        return res.data;
      }),
    );
  }

  getProductById(id): Observable<AxiosResponse<Product[]>> {
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
    return this.productRepository.createProduct(
      createProductDto,
      productCategoryDto,
    );
  }

  async getProductsFromDb(): Promise<any> {
    const products = await this.productRepository.findProducts();

    if (!products) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  async getProductByIdFromDb(id: number): Promise<any> {
    const result = await this.productRepository.findOneProduct(id);

    if (!result) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    return result;
  }

  async updateProduct(
    id: number,
    createProductDto: CreateProductDto,
    productCategoryDto: ProductCategoryDto,
  ): Promise<any> {
    const result = await this.productRepository.updateProduct(
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
    const result = await this.productRepository.deleteProduct(id);

    if (!result) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
  }
}
