import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.port || 3000
  // app.enableCors()

  await app.listen(port, "0.0.0.0");
}
bootstrap();
