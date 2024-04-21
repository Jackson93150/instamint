import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { NftService } from './nft.service';

import { NftEntity } from '../../models';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createNft(@Body() nft: NftEntity): Promise<NftEntity> {
    return this.nftService.createDraft(nft);
  }

  @Get('count')
  async getTotalNftCount(): Promise<number> {
    return await this.nftService.getTotalNfts();
  }
}
