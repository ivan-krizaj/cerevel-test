import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  PrismaClientUnknownRequestError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';
import { GlobalResponseError } from './global-response-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message.message;
    let code = 'HttpException';

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case HttpException:
        console.log(1);
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        break;
      case BadRequestException:
        console.log(2);
        message = exception;
        break;
      case PrismaClientUnknownRequestError:
        console.log(3);
        message = exception;
        break;
      case PrismaClientKnownRequestError:
        console.log(4);
        message = exception;
        break;
      case PrismaClientRustPanicError:
        console.log(5);
        message = exception;
        break;
      case PrismaClientInitializationError:
        console.log(6);
        message = exception;
        break;
      case PrismaClientValidationError:
        console.log(7);
        message = exception;
        break;
      default:
        console.log(8);
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = exception;
    }

    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request));
  }
}
