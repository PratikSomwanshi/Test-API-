import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTConstant } from 'utils/contant/jwt_constant';
import { LoginMiddleware } from 'middleware/login_middleware';
import { RegisterMiddleware } from 'middleware/register_middleware';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWTConstant.JWT_SECRET,
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [AuthService, UserService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes({
      path: 'login',
      method: RequestMethod.POST,
    });

    consumer.apply(RegisterMiddleware).forRoutes({
      path: 'register',
      method: RequestMethod.POST,
    });
  }
}
