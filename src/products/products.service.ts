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
  ) {
    return this.productRepository.createProduct(
      createProductDto,
      productCategoryDto,
    );
  }
}
