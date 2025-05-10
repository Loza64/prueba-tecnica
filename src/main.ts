/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configPipe } from './config.app';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(configPipe));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
