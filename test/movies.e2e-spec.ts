import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Movies API (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /producers/intervals should return 200', async () => {
    await request(app.getHttpServer()).get('/producers/intervals').expect(200);
  });

  it('should return min and max arrays', async () => {
    const { body } = await request(app.getHttpServer()).get(
      '/producers/intervals'
    );

    expect(body).toHaveProperty('min');
    expect(body).toHaveProperty('max');
  });

  it('should return consistent award intervals', async () => {
    const { body } = await request(app.getHttpServer()).get(
      '/producers/intervals'
    );

    [...body.min, ...body.max].forEach((item) => {
      expect(item.followingWin - item.previousWin).toBe(item.interval);
    });
  });

  it('should not return negative intervals', async () => {
    const { body } = await request(app.getHttpServer()).get(
      '/producers/intervals'
    );

    [...body.min, ...body.max].forEach((item) => {
      expect(item.interval).toBeGreaterThan(0);
    });
  });
});
