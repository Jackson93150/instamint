import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NftEntity } from '../../models';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(NftEntity)
    private readonly nftRepository: Repository<NftEntity>,
  ) {}

  async createDraft(nft: NftEntity): Promise<NftEntity> {
    const createdNft = await this.nftRepository.save(nft);
    return createdNft;
  }

  async getTotalNfts(): Promise<number> {
    const count = await this.nftRepository.count();
    return count === undefined ? 0 : count;
  }
}
