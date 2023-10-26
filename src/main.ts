import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors()

  await app.listen(8000, () => {
    console.log('app is runinng')
  });
}
bootstrap();
