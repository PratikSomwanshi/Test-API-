import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'utils/enums/error_code';

export class CustomException {
  private readonly explanation: string;
  private readonly statusCode: HttpStatus;
  private readonly errorCode: ErrorCode;

  public constructor(
    explanation: string,
    statusCode: HttpStatus,
    errorCode: ErrorCode,
  ) {
    this.explanation = explanation;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }

  public getExplanation() {
    return this.explanation;
  }

  public getStatusCode() {
    return this.statusCode;
  }

  public getErrorCode() {
    return this.errorCode;
  }
}
