import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createExchangeDto: CreateExchangeDto) {
    return this.appService.create(createExchangeDto);
  }

  @Get()
  findAll() {
    return this.appService.findAll();
  }
}
