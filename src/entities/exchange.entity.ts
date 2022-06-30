import { ExchangeType, IExchange } from '../interfaces/exchange.interface';
import { v4 as uuidV4 } from 'uuid';

export class Exchange implements IExchange {
  id: string;
  timestamp: Date;
  currencyFrom: string;
  amountFrom: number;
  currencyTo: string;
  amountTo: number;
  type: ExchangeType;

  constructor(params: Partial<IExchange> = {}) {
    this.id = uuidV4();
    this.timestamp = new Date();
    this.currencyFrom = params.currencyFrom;
    this.amountFrom = params.amountFrom;
    this.currencyTo = params.currencyTo;
    this.amountTo = params.amountTo;
    this.type = params.type ?? 'exchanged';
  }
}
