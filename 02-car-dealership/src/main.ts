import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(

    new ValidationPipe({
      // remueve todo lo que no esta incluido en el DTO
      whitelist: true,
      // retorna bad request si hay propiedades no requeridas en el DTO
      forbidNonWhitelisted: true,
    }),


  )
  await app.listen(3000);
}
bootstrap();
