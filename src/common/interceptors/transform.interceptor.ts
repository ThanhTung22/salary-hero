import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IResponseSuccess, IResponseLogging } from '../interfaces';
import { CustomLogger } from '../utils/custom-logger.util';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private readonly logger = new CustomLogger(TransformInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request: Request = context.switchToHttp().getRequest();
    const start = Date.now();
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next
      .handle()
      .pipe(
        tap((data) => {
          const log: IResponseLogging = {
            url: request?.url,
            method: request?.method,
            statusCode: statusCode,
            data: data,
            time: Date.now() - start + 'ms',
          };

          this.logger.log(JSON.stringify(log));
        }),
      )
      .pipe(
        map((data) => {
          const success: IResponseSuccess = {
            data,
            statusCode,
          };
          return success;
        }),
      );
  }
}
