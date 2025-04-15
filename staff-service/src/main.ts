import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.flatMap((err) =>
          Object.values(err.constraints || {}),
        );
        return new BadRequestException({
          status: 'error',
          message: 'Validation failed',
          errors: errorMessages,
        });
      },
    }),
  );

  // Kích hoạt CORS (nếu cần)
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = 3002;
  await app.listen(port);
}

bootstrap();
