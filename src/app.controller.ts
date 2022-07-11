import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appGateway: AppGateway,
  ) {}

  @Post()
  @HttpCode(204)
  async create(@Body() createExchangeDto: CreateExchangeDto) {
    await this.appService.create({
      ...createExchangeDto,
      type: 'exchanged',
    });

    await this.appGateway.hasUpdate();

    return;
  }

  @Get()
  findAll(@Query() query) {
    return this.appService.findAll({
      offset: query?.offset || 5,
    });
  }
}
