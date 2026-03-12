import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3010;
  app.enableCors();
  await app.listen(port);
  console.log(`[analytics-service] running on port ${port}`);
}

bootstrap();
