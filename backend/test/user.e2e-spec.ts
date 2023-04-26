import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { UserApiBody } from '../src/model/user/add.model';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/user/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/user/signup')
      .send({
        user: 'test@test.com',
        password: 'test',
      } as UserApiBody)
      .expect(201)
      .then((response) => {
        expect(response.body.data.user).toBeDefined();
        expect(response.body.data.messages).toStrictEqual([]);
      });
  });

  it('/api/user/login (POST) should test successful login', () => {
    return request(app.getHttpServer())
      .post('/user/login')
      .send({
        user: 'test@test.com',
        password: 'test',
      } as UserApiBody)
      .expect(201)
      .then((response) => {
        expect(response.body.data.user).toBeDefined();
        expect(response.body.data.jwt).toBeDefined();
        expect(typeof response.body.data.jwt).toBe('string');
      });
  });

  it('/api/user/login (POST) with wrong password should give 401', () => {
    return request(app.getHttpServer())
      .post('/user/login')
      .send({
        user: 'test@test.com',
        password: 'wrongPassword',
      } as UserApiBody)
      .expect(401);
  });

  afterAll(() => app.close());
});
