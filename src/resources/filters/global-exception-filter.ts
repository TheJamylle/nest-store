import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private logger: ConsoleLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);
    console.error(exception);

    const { httpAdapter } = this.adapterHost;

    const context = host.switchToHttp();

    const response = context.getResponse();
    const request = context.getRequest();

    if ('user' in request) {
      this.logger.log(`Endpoint executed by user ${request.user.sub}`);
    }

    const { status, body } =
      exception instanceof HttpException
        ? { status: exception.getStatus(), body: exception.getResponse() }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(request),
            },
          };

    httpAdapter.reply(response, body, status);
  }
}
