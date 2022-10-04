import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

const mockProductsRepository = () => ({
  getProducts: jest.fn(),
});

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productsRepository: ProductsRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        AuthModule,
        CategoryModule,
        PassportModule,
        { provide: ProductsRepository, useFactory: mockProductsRepository },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  //   describe('getProducts', () => {
  //     it('calls ProductsRepository.getProducts and return the result', () => {
  //       expect(productsRepository.findProducts).not.toHaveBeenCalled();
  //       //   productsRepository.get
  //       const result = productsService.getProducts();
  //       expect(productsRepository.findProducts).toHaveBeenCalled();
  //       expect(result).toEqual('');
  //     });
  //   });
});
