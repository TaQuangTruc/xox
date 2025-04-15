// src/common/filters/http-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.getResponse();

    // Nếu exception đã là object với status/message/errors thì giữ nguyên
    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'status' in exceptionResponse &&
      'message' in exceptionResponse
    ) {
      return response.status(status).json(exceptionResponse);
    }

    // Trường hợp fallback
    return response.status(status).json({
      status: 'error',
      message:
        (typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exception.message) || 'Internal server error',
      errors: [],
    });
  }
}
