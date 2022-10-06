import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get(AppService);
  });

  describe('getHello', () => {
    it('Should call appService.getHello and return Hello World!', () => {
      const result = appService.getHello();
      expect(result).toBe('Hello World!');
    });
  });
});
