import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from 'utils/enums/error_code';
import { errorResponse } from 'utils/response/error_response';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = errorResponse(
        'Email and password are required',
        ErrorCode.GENERAL_ERROR,
      );

      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }

    next();
  }
}
