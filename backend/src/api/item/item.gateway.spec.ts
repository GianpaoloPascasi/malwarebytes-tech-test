import { Test, TestingModule } from '@nestjs/testing';
import { ItemGateway } from './item.gateway';

describe('ItemGateway', () => {
  let gateway: ItemGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemGateway],
    }).compile();

    gateway = module.get<ItemGateway>(ItemGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
