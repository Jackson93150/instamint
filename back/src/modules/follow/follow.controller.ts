import { Controller, Get, Param } from '@nestjs/common';

import { FollowService } from './follow.service';

import { FollowEntity } from '../../models';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('follower/:minterId')
  async findFollowerById(
    @Param('minterId') minterId: number,
  ): Promise<FollowEntity[]> {
    return await this.followService.findFollowerById(minterId);
  }

  @Get('followed/:minterId')
  async findFollowedById(
    @Param('minterId') minterId: number,
  ): Promise<FollowEntity[]> {
    return await this.followService.findFollowedById(minterId);
  }
}
