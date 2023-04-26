import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Swagger');

  const config = new DocumentBuilder()
    .setTitle('Salary Hero API')
    .setDescription('The Salary Hero API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  logger.log(`Api document: http://localhost:${process.env.APP_PORT}/api/docs`);

  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors();

  await app.listen(process.env.APP_PORT);
}
bootstrap();
