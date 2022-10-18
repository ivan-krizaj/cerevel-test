import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['https://cerevel-app.vercel.app', 'http://localhost:4008'],
  });
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
}
main();
