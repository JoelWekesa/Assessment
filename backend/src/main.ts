import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import otelSDK from './tracing';
import { Logger } from 'nestjs-pino';

async function bootstrap() {

  await otelSDK.start();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useLogger(app.get(Logger));

  await app.listen(5001);
}
bootstrap();
