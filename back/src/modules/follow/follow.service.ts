import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FollowEntity } from '../../models';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async createFollow(draft: FollowEntity): Promise<FollowEntity> {
    const createdFollow = await this.followRepository.save(draft);
    return createdFollow;
  }

  async findFollowerById(minterId: number): Promise<FollowEntity[]> {
    return await this.followRepository.find({
      where: {
        minterId,
        type: 'follower',
      },
    });
  }

  async findFollowedById(minterId: number): Promise<FollowEntity[]> {
    return await this.followRepository.find({
      where: {
        minterId,
        type: 'followed',
      },
    });
  }
}
