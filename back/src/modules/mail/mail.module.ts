import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
    AuthModule,
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService, MailModule],
})
export class MailModule {}
