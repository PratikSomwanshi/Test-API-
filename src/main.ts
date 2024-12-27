import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { GlobalExceptionHandler } from 'utils/exception/global_exception_handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms'),
  );

  app.useGlobalFilters(new GlobalExceptionHandler());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
