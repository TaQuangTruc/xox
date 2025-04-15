import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ResponseFormatter } from '../formatters/response.formatter';

export class ResponseHandlerService {
  handleResponse<T>(res: ApiResponse<T>): T {
    if (res.status == 'errors') {
      throw new BadRequestException({
        message: res.message,
        errors: res.errors || [],
      });
    }
    return res.data as T;
  }

  handleAxiosError(error: AxiosError<ApiResponse<any>>): never {
    if (error.response) {
      const apiRes = error.response.data;
      if (apiRes?.status === 'error') {
        throw new BadRequestException({
          status: 'error',
          message: apiRes.message,
          errors: apiRes.errors || [],
        });
      }
    }
    console.log(error.response);
    throw new InternalServerErrorException('Unknown error from patient service');
  }
}
