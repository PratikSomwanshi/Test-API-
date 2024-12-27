import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { JWTConstant } from 'utils/contant/jwt_constant';
import { ErrorCode } from 'utils/enums/error_code';
import { CustomException } from 'utils/exception/custom_exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWTConstant.JWT_SECRET,
      });

      request['user'] = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new CustomException(
          'Token expired',
          HttpStatus.UNAUTHORIZED,
          ErrorCode.TOKEN_EXPIRED,
        );
      }

      throw new CustomException(
        error.message || 'Invalid token',
        HttpStatus.UNAUTHORIZED,
        ErrorCode.INVALID_TOKEN,
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (!token) {
      throw new CustomException(
        'Token not found',
        HttpStatus.UNAUTHORIZED,
        ErrorCode.TOKEN_NOT_FOUND,
      );
    }

    if (type !== 'Bearer') {
      throw new CustomException(
        'Invalid token type',
        HttpStatus.UNAUTHORIZED,
        ErrorCode.INVALID_TOKEN,
      );
    }
    return token;
  }
}
