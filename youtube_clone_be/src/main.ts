import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }); // cors
  app.use(express.static('.'));
  const config = new DocumentBuilder()
    .setTitle('youtube clone API')
    .setDescription('API for youtube clone project')
    .setVersion('1.1.3')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(8080);
}
bootstrap();

// nest g resource user --no-spec
