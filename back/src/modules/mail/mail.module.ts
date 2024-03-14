import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JwtModule],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService, MailModule],
})
export class MailModule {}
