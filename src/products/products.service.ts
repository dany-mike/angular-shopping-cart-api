import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(private httpService: HttpService) {}

  products: Product[] = [];

  getProducts(): Observable<AxiosResponse<Product[]>> {
    return this.httpService.get('https://fakestoreapi.com/products');
  }
}
