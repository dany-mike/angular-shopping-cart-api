import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Product } from './product.model';
import { map } from 'rxjs/operators';
import { ProductDto } from './product.dto';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private httpService: HttpService,
    private productRepository: ProductRepository,
  ) {}

  getProducts(): Observable<AxiosResponse<Product[]>> {
    return this.httpService
      .get('https://fakestoreapi.com/products')
      .pipe(map((res) => res.data));
  }

  getProductById(id): Observable<AxiosResponse<Product[]>> {
    return this.httpService
      .get(`https://fakestoreapi.com/products/${id}`)
      .pipe(map((res) => res.data));
  }

  createProduct(createProductDto: ProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }
}
