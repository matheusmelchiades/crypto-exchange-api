import { Test, TestingModule } from '@nestjs/testing';
import { RateGateway } from './rate.gateway';

describe('RateGateway', () => {
  let gateway: RateGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateGateway],
    }).compile();

    gateway = module.get<RateGateway>(RateGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
