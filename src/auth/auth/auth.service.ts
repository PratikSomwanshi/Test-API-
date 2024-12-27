import { HttpStatus, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'dto/user';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from 'utils/exception/custom_exception';
import { ErrorCode } from 'utils/enums/error_code';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async register(user: UserDto) {
    const hashedPassword = await this.hashPassword(user.password);
    // const isMatch = await bcrypt.compare('123', hashedPassword);

    const newUser = await this.usersService.saveUser({
      ...user,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(user: UserDto) {
    const existingUser = await this.usersService.getUserByEmail(
      user.email,
      false,
    );

    if (!existingUser) {
      throw new CustomException(
        'User not found',
        HttpStatus.NOT_FOUND,
        ErrorCode.USER_NOT_FOUND,
      );
    }

    console.log(user.password, existingUser.password);

    const isMatch = await bcrypt.compare(user.password, existingUser.password);

    if (!isMatch) {
      throw new CustomException(
        'Invalid Password',
        HttpStatus.UNAUTHORIZED,
        ErrorCode.USER_NOT_AUTHORIZED,
      );
    }

    const payload = {
      sub: user.email,
      username: user.username,
      email: user.email,
    };

    return {
      username: existingUser.username,
      email: existingUser.email,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
