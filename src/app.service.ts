import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { Exchange } from './entities/exchange.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Exchange)
    private appRepository: Repository<Exchange>,
  ) {}

  async create(createExchangeDto: CreateExchangeDto) {
    await this.appRepository.save(createExchangeDto);
  }

  async createMany(createExchangeDtos: CreateExchangeDto[]) {
    await this.appRepository.save(createExchangeDtos);
  }

  async findAll() {
    return this.appRepository.find();
  }
}
