import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinterEntity } from '../../models';
import { MinterController } from './minter.controller';
import { MinterService } from './minter.service';

@Module({
  imports: [TypeOrmModule.forFeature([MinterEntity])],
  controllers: [MinterController],
  providers: [MinterService],
})
export class MinterModule {}
