import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { MinterModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';
import { ContentModule } from './modules/content/content.module';
import { DraftModule } from './modules/draft/draft.module';
import { FollowModule } from './modules/follow/follow.module';
import { MailModule } from './modules/mail/mail.module';
import { MintModule } from './modules/mint/mint.module';
import { NftModule } from './modules/nft/nft.module';
import { TransactionModule } from './modules/transaction/transaction.module';

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
    DraftModule,
    FollowModule,
    NftModule,
    MintModule,
    TransactionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
