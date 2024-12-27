import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'dto/user';
import { successResponse } from 'utils/response/success_response';
import { SuccessCode } from 'utils/enums/success_code';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() user: UserDto) {
    const newUser = await this.authService.register(user);

    const success = successResponse(
      'User registered successfully',
      newUser,
      SuccessCode.USER_CREATED,
    );

    return success;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() user: UserDto) {
    console.log(user);
    const jwtUser = await this.authService.login(user);

    const success = successResponse(
      'User logged in successfully',
      jwtUser,
      SuccessCode.USER_LOGGED_IN,
    );

    return success;
  }
}
