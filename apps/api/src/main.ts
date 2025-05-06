import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger('Treyst API'),
    bufferLogs: true,
  });
  app.useLogger(new Logger('Treyst API'));
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
