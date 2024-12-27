import { HttpStatus, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from 'utils/enums/error_code';
import { errorResponse } from 'utils/response/error_response';

export class RegisterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      const error = errorResponse(
        'Email, password, and username are required',
        ErrorCode.GENERAL_ERROR,
      );

      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }

    next();
  }
}
