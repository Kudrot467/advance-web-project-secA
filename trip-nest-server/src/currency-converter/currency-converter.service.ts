import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyConverterService {
  async convertUSDToBDT(amountInUSD: number): Promise<number> {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/USD');
      const exchangeRates = response.data.rates;
      const rateBDT = exchangeRates.BDT;
      const amountInBDT = amountInUSD * rateBDT;
      return amountInBDT;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw new Error('Failed to convert currency');
    }
  }
  async convertAUDToBDT(amountInAUD: number): Promise<number> {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/AUD');
      const exchangeRates = response.data.rates;
      const rateBDT = exchangeRates.BDT;
      const amountInBDT = amountInAUD * rateBDT;
      return amountInBDT;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw new Error('Failed to convert currency');
    }
  }
  async convertCADToBDT(amountInCAD: number): Promise<number> {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/CAD');
      const exchangeRates = response.data.rates;
      const rateBDT = exchangeRates.BDT;
      const amountInBDT = amountInCAD * rateBDT;
      return amountInBDT;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw new Error('Failed to convert currency');
    }
  }
  async convertINRToBDT(amountInINR: number): Promise<number> {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/INR');
      const exchangeRates = response.data.rates;
      const rateBDT = exchangeRates.BDT;
      const amountInBDT = amountInINR * rateBDT;
      return amountInBDT;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw new Error('Failed to convert currency');
    }
  }
  async convertEURToBDT(amountInEUR: number): Promise<number> {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/EUR');
      const exchangeRates = response.data.rates;
      const rateBDT = exchangeRates.BDT;
      const amountInBDT = amountInEUR * rateBDT;
      return amountInBDT;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw new Error('Failed to convert currency');
    }
  }
}
