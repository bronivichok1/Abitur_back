import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors();
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  const PORT=process.env.PORT;
  await app.listen(PORT,'127.0.0.1');
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
      transform: true,
    }),);
}
bootstrap();
