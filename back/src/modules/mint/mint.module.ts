import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MintController } from './mint.controller';
import { MintService } from './mint.service';

import { MintEntity } from '../../models';

@Module({
  imports: [TypeOrmModule.forFeature([MintEntity])],
  controllers: [MintController],
  providers: [MintService],
  exports: [MintService],
})
export class MintModule {}
