import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-auth.guard';
import { EmailVerificationGuard } from './jwt-mail-auth.guard';
import { MinterModule } from '../minter/minter.module';

import { DeletedMinter } from '../../models';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
    MinterModule,
    TypeOrmModule.forFeature([DeletedMinter]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmailVerificationGuard],
  exports: [AuthService, JwtStrategy, EmailVerificationGuard],
})
export class AuthModule {}
