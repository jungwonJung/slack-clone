import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    // 전체부분 컨트롤러 가기전  (실행되고나서는 handle 부분에설정)
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
  }
}
