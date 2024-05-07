import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyConverterService } from './currency-converter.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Currency Converter')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyConverterService: CurrencyConverterService) {}

  @Get('/usd-to-bdt/:amount')
  async convertUSDToBDT(@Param('amount') amount: string): Promise<number> {
    const amountInUSD = parseFloat(amount);
    return this.currencyConverterService.convertUSDToBDT(amountInUSD);
  }
  @Get('aud-to-bdt/:amount')
  async convertAUDToBDT(@Param('amount') amount: string): Promise<number> {
    const amountInAUD = parseFloat(amount);
    return this.currencyConverterService.convertAUDToBDT(amountInAUD);
  }

  @Get('cad-to-bdt/:amount')
  async convertCADToBDT(@Param('amount') amount: string): Promise<number> {
    const amountInCAD = parseFloat(amount);
    return this.currencyConverterService.convertCADToBDT(amountInCAD);
  }

  @Get('inr-to-bdt/:amount')
  async convertINRToBDT(@Param('amount') amount: string): Promise<number> {
    const amountInINR = parseFloat(amount);
    return this.currencyConverterService.convertINRToBDT(amountInINR);
  }

  @Get('eur-to-bdt/:amount')
  async convertEURToBDT(@Param('amount') amount: string): Promise<number> {
    const amountInEUR = parseFloat(amount);
    return this.currencyConverterService.convertEURToBDT(amountInEUR);
  }
}
