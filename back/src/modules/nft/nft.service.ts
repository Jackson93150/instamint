import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MinterService } from '../minter/minter.service';

import { NftEntity } from '../../models';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(NftEntity)
    private readonly nftRepository: Repository<NftEntity>,
    private readonly minterService: MinterService,
  ) {}

  async createNft(nft: NftEntity): Promise<NftEntity> {
    const createdNft = await this.nftRepository.save(nft);
    return createdNft;
  }

  async getTotalNfts(): Promise<number> {
    const count = await this.nftRepository.count();
    return count === undefined ? 0 : count;
  }

  async getNftsByMinterAddress(minterAddress: string): Promise<NftEntity[]> {
    return this.nftRepository.find({
      where: { minterAddress },
      relations: ['minter'],
    });
  }

  async getNftsByMinterId(minterId: number): Promise<NftEntity[]> {
    return this.nftRepository.find({
      where: { minter: { id: minterId } },
      relations: ['minter'],
    });
  }

  async getNftByTokenId(tokenId: number): Promise<NftEntity> {
    return this.nftRepository.findOne({
      where: { tokenId },
      relations: ['minter'],
    });
  }

  async updateNftPriceAndListed(
    tokenId: number,
    price: number,
    listed: boolean,
  ): Promise<NftEntity> {
    const nft = await this.nftRepository.findOne({ where: { tokenId } });
    if (nft) {
      nft.price = price;
      nft.listed = listed;
      await this.nftRepository.save(nft);
    }
    return nft;
  }

  async updateMinterInfo(
    tokenId: number,
    newMinterAddress: string,
    newMinterId: number,
  ): Promise<NftEntity> {
    const nft = await this.nftRepository.findOne({
      where: { tokenId },
      relations: ['minter'],
    });

    if (!nft) {
      throw new Error('NFT not found');
    }

    const newMinter = await this.minterService.getMinterById(newMinterId);
    if (!newMinter) {
      throw new Error('Minter not found');
    }

    nft.minterAddress = newMinterAddress;
    nft.minter = newMinter;
    nft.listed = false;

    await this.nftRepository.save(nft);
    return nft;
  }
}
