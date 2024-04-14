import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MinterController } from './minter.controller';
import { MinterService } from './minter.service';

import { MinterEntity } from '../../models';
import { DeletedMinter } from '../../models/deleted-Minter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MinterEntity]),
    TypeOrmModule.forFeature([DeletedMinter]),
  ],
  controllers: [MinterController],
  providers: [MinterService],
  exports: [MinterService],
})
export class MinterModule {}
