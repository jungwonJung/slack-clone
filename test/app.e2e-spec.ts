import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import session from 'express-session';
import passport from 'passport';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
          httpOnly: true,
        },
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session()); // 사용하는 middleware 들도 다
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/user/login (POST)', () => {
    return request(app.getHttpServer()) // 테스트용 db 를 하나 만들기
      .post('/api/user/login')
      .send({
        email: 'wjdwjd1501@gmail.com',
        password: 123123,
      })
      .expect(201, done); // 비동기테스트는 작성해줘야한다고 함 done 을
  });
});
