import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors) => {
        const formatted = validationErrors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints || {}),
        }));
        return new HttpException(
          {
            message: 'Validation failed',
            errors: formatted,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  // Kích hoạt CORS (nếu cần)
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = 3011;
  await app.listen(port);
}

bootstrap();
