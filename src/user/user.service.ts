import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'dto/user';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCode } from 'utils/enums/error_code';
import { CustomException } from 'utils/exception/custom_exception';

@Injectable()
export class UserService {
  public constructor(private readonly prisma: PrismaService) {}

  async login() {}

  async saveUser(user: UserDto) {
    await this.getUserByEmail(user.email);

    return this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  }

  async getUserByEmail(email: string, throwError = true) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (throwError && existingUser) {
      throw new CustomException(
        'User already exist',
        HttpStatus.NOT_FOUND,
        ErrorCode.USER_NOT_FOUND,
      );
    }

    return existingUser;
  }
}
