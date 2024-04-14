import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DraftController } from './draft.controller';
import { DraftService } from './draft.service';

import { DraftEntity } from '../../models';

@Module({
  imports: [TypeOrmModule.forFeature([DraftEntity])],
  controllers: [DraftController],
  providers: [DraftService],
  exports: [DraftService],
})
export class DraftModule {}
