/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Response } from 'express'
import { Observable } from 'rxjs'

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const e = exception.getError()

    if (typeof e === 'string') {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e,
      })
    }

    if (
      typeof e === 'object' &&
      'message' in e &&
      'statusCode' in e &&
      'error' in e
    ) {
      response.status(e.statusCode as number).json({
        statusCode: e.statusCode,
        error: e.error,
        message: e.message,
      })
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error interno del servidor',
      })
    }

    return new Observable((observer) => observer.complete())
  }
}
