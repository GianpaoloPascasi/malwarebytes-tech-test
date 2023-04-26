import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from '../../../data-source';
import { UserEntity } from '../entity/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const email = 'test@test.com';
  const password = 'myPassword';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot(dataSourceConfig),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      exports: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should signup a user', async () => {
    const user = await service.createOrUpdate(email, password);
    expect(user).toBeDefined();
  });

  it('should check user password and salt', async () => {
    const user = await service.userRepository.findOne({
      where: { user: email },
      select: ['password', 'salt'],
    });
    expect(user.salt).toBeDefined();
    expect(user.salt.length).toBeGreaterThan(0);
    expect(user.password.length).toBeGreaterThan(0);
  });

  it('should login a user', async () => {
    const user = await service.login(email, password);
    expect(user).toBeDefined();
  });

  it('should not login a user with wrong password', async () => {
    try {
      await service.login(email, 'wrong!');
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });
});
