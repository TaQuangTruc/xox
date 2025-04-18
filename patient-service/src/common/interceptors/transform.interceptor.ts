import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: 'successful',
          message: data?.message || 'Request processed successfully',
          data: data?.data ?? [],
          meta: data?.meta ?? undefined,
          errors: null,
        };
      }),
    );
  }
}
