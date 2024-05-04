import { Controller, Body, UseGuards, Get, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { MintService } from './mint.service';

import { MintEntity, MintDto } from '../../models';

@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateOrCreateMint(@Body() mint: MintDto): Promise<MintEntity | null> {
    return await this.mintService.createOrUpdateMint(
      mint.mint,
      mint.minterId,
      mint.nftId,
    );
  }

  @Get('nft/:nftId/:mint')
  async getMintsTrueByNftId(
    @Param('nftId') nftId: number,
    @Param('mint') mint: boolean,
  ): Promise<MintEntity[]> {
    return await this.mintService.getMintsByNftId(nftId, mint);
  }

  @Get('mint/:nftId/:minterId')
  async getMintsStatus(
    @Param('nftId') nftId: number,
    @Param('minterId') minterId: number,
  ): Promise<boolean | null> {
    return await this.mintService.getMintStatus(nftId, minterId);
  }
}
