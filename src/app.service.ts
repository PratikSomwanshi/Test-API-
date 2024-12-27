import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'dto/user';
import { PrismaService } from './prisma/prisma.service';
import { CustomException } from 'utils/exception/custom_exception';
import { ErrorCode } from 'utils/enums/error_code';

@Injectable()
export class AppService {}
