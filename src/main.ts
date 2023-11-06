import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { otelSDK } from './tracing';

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, "0.0.0.0");
}
bootstrap();
