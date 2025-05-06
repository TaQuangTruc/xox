import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

export abstract class BaseRepository {
  protected async request<T>(
    action: () => Observable<AxiosResponse<T>>,
    context: string,
  ): Promise<T> {
    try {
      const response = await lastValueFrom<AxiosResponse<T>>(action());

      if (!response || typeof response !== 'object' || !('data' in response)) {
        throw new InternalServerErrorException('Invalid response format');
      }

      return response.data;
    } catch (error) {
      this.handleHttpError(error, context);
    }
  }

  protected handleHttpError(error: any, context: string): never {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status || 500;
    const data = axiosError.response?.data as any;

    const message = data?.message || axiosError.message || 'Unknown error';
    const errors = data?.errors || [];

    console.error(`[${this.constructor.name}.${context}]`, message, errors);

    if (status >= 400 && status < 500) {
      throw new BadRequestException({
        message,
        errors,
      });
    }

    throw new InternalServerErrorException('Internal server error');
  }
}
