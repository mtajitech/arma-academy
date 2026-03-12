import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3011;
  app.enableCors();
  await app.listen(port);
  console.log(`[notification-service] running on port ${port}`);
}

bootstrap();
