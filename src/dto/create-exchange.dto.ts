import { ExchangeType } from '../interfaces/exchange.interface';

export class CreateExchangeDto {
  currencyFrom: string;
  amountFrom: number;
  currencyTo: string;
  amountTo: number;
  type?: ExchangeType;
}
