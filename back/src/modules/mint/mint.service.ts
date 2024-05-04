import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MintEntity, MinterEntity, NftEntity } from '../../models';

@Injectable()
export class MintService {
  constructor(
    @InjectRepository(MintEntity)
    private readonly mintRepository: Repository<MintEntity>,
  ) {}

  async createOrUpdateMint(
    mint: boolean,
    minterId: number,
    nftId: number,
  ): Promise<MintEntity | null> {
    const existingMint = await this.mintRepository.findOne({
      where: {
        minter: { id: minterId },
        nft: { id: nftId },
      },
      relations: ['minter', 'nft'],
    });

    if (existingMint) {
      if (existingMint.mint === mint) {
        await this.mintRepository.remove(existingMint);
        return null;
      } else {
        existingMint.mint = mint;
        return await this.mintRepository.save(existingMint);
      }
    } else {
      const newMint = new MintEntity();
      newMint.mint = mint;
      newMint.minter = { id: minterId } as MinterEntity;
      newMint.nft = { id: nftId } as NftEntity;

      return await this.mintRepository.save(newMint);
    }
  }

  async getMintsByNftId(nftId: number, mint: boolean): Promise<MintEntity[]> {
    return this.mintRepository.find({
      where: {
        nft: { id: nftId },
        mint: mint,
      },
      relations: ['minter', 'nft'],
    });
  }

  async getMintStatus(
    nftId: number,
    minterId: number,
  ): Promise<boolean | null> {
    const mint = await this.mintRepository.findOne({
      where: {
        minter: { id: minterId },
        nft: { id: nftId },
      },
    });

    return mint ? mint.mint : null;
  }
}
