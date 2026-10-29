import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 3000);
  const appEnv = configService.get<string>('APP_ENV', 'localhost');

  await app
    .listen(port)
    .then(() =>
      console.log(`Running on http://localhost:${port} on ${appEnv}`),
    );

  const url = await app.getUrl();
  Logger.log(url);
}

void bootstrap();
