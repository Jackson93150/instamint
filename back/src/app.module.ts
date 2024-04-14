import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { MinterModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';
import { ContentModule } from './modules/content/content.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized: false,
            }
          : false,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.SMTP,
      }),
    }),
    ScheduleModule.forRoot(),
    MinterModule,
    AuthModule,
    MailModule,
    ContentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
