import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
    );
  await app.listen(process.env.PORT || 3000);

  const logger = new Logger('API TESLO-SHOP');
  Logger.log('====== API TESLO SHOP CORRIENDO =======');
}
bootstrap();
