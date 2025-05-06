import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseStatus = 'error';
    let message = 'Internal server error';
    let errors: any[] = [];

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      status = exception.getStatus();
      responseStatus = status === HttpStatus.BAD_REQUEST ? 'fail' : 'error';

      if (typeof res === 'object' && res !== null) {
        const obj = res as any;
        message = obj.message || message;
        errors = obj.errors || [];
      } else {
        message = res as string;
      }
    }

    response.status(status).json({
      status: responseStatus,
      message,
      data: [],
      meta: undefined,
      errors,
    });
  }
}
