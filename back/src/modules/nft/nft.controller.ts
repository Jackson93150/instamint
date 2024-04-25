import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { NftService } from './nft.service';

import { NftEntity } from '../../models';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createNft(@Body() nft: NftEntity): Promise<NftEntity> {
    return this.nftService.createNft(nft);
  }

  @Get('count')
  async getTotalNftCount(): Promise<number> {
    return await this.nftService.getTotalNfts();
  }

  @Get('address/:address')
  async getNftsByMinterAddress(
    @Param('address') minterAddress: string,
  ): Promise<NftEntity[]> {
    return this.nftService.getNftsByMinterAddress(minterAddress);
  }

  @Get('id/:id')
  async getNftsByMinterId(@Param('id') minterId: number): Promise<NftEntity[]> {
    return this.nftService.getNftsByMinterId(minterId);
  }

  @Get('token/:id')
  async getNftByTokenId(@Param('id') tokenId: number): Promise<NftEntity> {
    return this.nftService.getNftByTokenId(tokenId);
  }
}
