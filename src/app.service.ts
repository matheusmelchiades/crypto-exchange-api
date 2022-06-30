import { Injectable } from '@nestjs/common';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { Exchange } from './entities/exchange.entity';

@Injectable()
export class AppService {
  private readonly exchanges: Exchange[] = [];

  create(createExchangeDto: CreateExchangeDto) {
    const exchange = new Exchange(createExchangeDto);

    this.exchanges.push(exchange);
  }

  findAll() {
    return this.exchanges;
  }
}
