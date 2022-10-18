import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, PrismaService, UsersService],
  imports: [PassportModule],
})
export class AuthModule {}
