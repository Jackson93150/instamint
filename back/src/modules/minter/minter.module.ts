import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MinterController } from './minter.controller';
import { MinterService } from './minter.service';

import { MinterEntity } from '../../models';

@Module({
  imports: [TypeOrmModule.forFeature([MinterEntity])],
  controllers: [MinterController],
  providers: [MinterService],
  exports: [MinterModule, MinterService],
})
export class MinterModule {}
