import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Product } from '../src/products/product.entity';
// import * as request from 'supertest';
import { Repository } from 'typeorm';
import { ProductsController } from '../src/products/products.controller';
import { ProductsRepository } from '../src/products/products.repository';
import { ProductsService } from '../src/products/products.service';
// import { MockType } from './types/types';

// const productsFixture = [];
// class MockProductRepository {
//   findProducts = async (): Promise<Product[]> => {
//     return productsFixture;
//   };
// }

// export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
//   () => ({
//     findOne: jest.fn((entity) => entity),
//   }),
// );

describe('ProductsService', () => {
  let app: INestApplication;
  // let productMock: MockType<Repository<Product>>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        // {
        //   provide: getRepositoryToken(Product),
        //   useFactory: repositoryMockFactory,
        // },
      ],
    })
      .overrideProvider(ProductsRepository)
      .useClass(Repository)
      .compile();

    app = module.createNestApplication();

    await app.init();

    // productMock = module.get(getRepositoryToken(Product));
  });

  it('get all products', async () => {
    // const products = [];
    // productMock.findOne.mockReturnValue(products);
    // return request(app.getHttpServer())
    //   .get('/products')
    //   .expect(200)
    // .expect(productMock);
  });
});
