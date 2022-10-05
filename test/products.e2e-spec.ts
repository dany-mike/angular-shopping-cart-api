import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProductsService } from '../src/products/products.service';
import * as request from 'supertest';
import { ProductsController } from '../src/products/products.controller';

describe('ProductsService', () => {
  let app: INestApplication;
  const productsService = {
    getProducts: () => [],
    getProductById: () => {
      return {};
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(productsService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('get all products', async () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(productsService.getProducts());
  });

  it('get one product', async () => {
    return request(app.getHttpServer())
      .get(`/products/1`)
      .expect(200)
      .expect(productsService.getProductById());
  });

  afterAll(async () => {
    await app.close();
  });
});
