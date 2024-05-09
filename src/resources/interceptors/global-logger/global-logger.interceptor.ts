import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { UserRequest } from 'src/modules/auth/auth/auth.guard';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();

    const request = httpContext.getRequest<Request | UserRequest>();
    const response = httpContext.getResponse<Response>();

    const { path, method } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${path}`);

    const instantPreController = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(`Endpoint executed by user ${request.user.sub}`);
        }
        const timestamp = Date.now() - instantPreController;
        this.logger.log(`Response: status ${statusCode} - ${timestamp}ms`);
      }),
    );
  }
}
