import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { MinterModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';

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
    MinterModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
