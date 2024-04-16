import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

import { FollowEntity } from '../../models';

@Module({
  imports: [TypeOrmModule.forFeature([FollowEntity])],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
