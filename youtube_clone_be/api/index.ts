import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true,
    });
    await app.init();
  }
  return app;
}

export default async function handler(req, res) {
  const app = await bootstrap();
  const expressInstance = app.getHttpAdapter().getInstance();

  return new Promise<void>((resolve, reject) => {
    expressInstance(req, res, (err) => {
      if (err) {
        console.error('Express error:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
