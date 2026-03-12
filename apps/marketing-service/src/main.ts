import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3009;
  app.enableCors();
  await app.listen(port);
  console.log(`[marketing-service] running on port ${port}`);
}

bootstrap();
