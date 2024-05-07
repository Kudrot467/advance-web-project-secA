import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency-converter.controller';
import { CurrencyConverterService } from './currency-converter.service';

describe('CurrencyConverterController', () => {
  let controller: CurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [CurrencyConverterService],
    }).compile();

    controller = module.get<CurrencyController>(CurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
