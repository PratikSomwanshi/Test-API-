import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from 'dto/user';
import { successResponse } from 'utils/response/success_response';
import { SuccessCode } from 'utils/enums/success_code';
import { Response } from 'express';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthGuard } from './auth/auth/auth.guard';

@Controller()
export class AppController {
  @Get()
  public async getHello() {
    return 'React Native NestJS API working...';
  }
}
