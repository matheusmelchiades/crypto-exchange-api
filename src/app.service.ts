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
    return this.appRepository.save(createExchangeDtos);
  }

  async findAll(params: Partial<{ offset: number; page: number }>) {
    const { offset = 10, page = 1 } = params;
    const skip = offset * page - offset;

    return this.appRepository.find({
      take: offset,
      skip,
      order: {
        timestamp: 'DESC',
      },
    });
  }
}
