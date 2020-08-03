import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { microserviceOptions } from './gprc.options';

const logger = new Logger('Auth Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceOptions);
  app.listen(() => {
    logger.log('Auth Microservice is listening...');
  });
}
bootstrap();