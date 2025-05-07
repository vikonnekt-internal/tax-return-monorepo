import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/exception';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger('Treyst API'),
    bufferLogs: true,
  });
  app.useLogger(new Logger('Treyst API'));
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.enableCors();

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Tax ID Return API')
    .setDescription('The Tax ID Return API documentation')
    .setVersion('1.0')
    .addTag('tax-reports')
    .addTag('government-data')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'apiKey',
        in: 'body',
        description: 'API key for government systems integration',
      },
      'api-key',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
