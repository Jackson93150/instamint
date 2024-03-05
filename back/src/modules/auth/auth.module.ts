import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-auth.guard';
import { MinterModule } from '../minter/minter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
    MinterModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
