import { Module } from '@nestjs/common';
import { CurrencyConverterService } from './currency-converter.service';
import { CurrencyController } from './currency-converter.controller';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyConverterService],
})
export class CurrencyConverterModule {}
