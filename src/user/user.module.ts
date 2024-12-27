import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [UserService, PrismaService],
})
export class UserModule {}
