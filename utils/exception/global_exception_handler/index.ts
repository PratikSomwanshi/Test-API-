import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { CustomException } from '../custom_exception';
import { errorResponse } from 'utils/response/error_response';
import { ErrorCode } from 'utils/enums/error_code';

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (exception instanceof CustomException) {
      return response
        .status(exception.getStatusCode())
        .json(
          errorResponse(exception.getExplanation(), exception.getErrorCode()),
        );
    }

    console.log('exception: ', exception);

    return response
      .status(500)
      .json(
        errorResponse(
          exception.message || 'Internal server error',
          ErrorCode.GENERAL_ERROR,
        ),
      );
  }
}
