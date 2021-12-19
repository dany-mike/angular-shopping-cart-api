import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Product } from './product.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductsService {
  constructor(private httpService: HttpService) {}

  getProducts(): Observable<AxiosResponse<Product[]>> {
    return this.httpService
      .get('https://fakestoreapi.com/products')
      .pipe(map((res) => res.data));
  }
}
