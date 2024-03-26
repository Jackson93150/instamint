import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ContentService } from './content.service';

import { ContentEntity } from '../../models';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createContent(@Body() minter: ContentEntity): Promise<ContentEntity> {
    return this.contentService.createContent(minter);
  }

  @Get('minter')
  @UseGuards(AuthGuard('jwt'))
  async getContentByMinterId(@Req() req: any): Promise<ContentEntity[]> {
    const contents = await this.contentService.getContentByMinterId(
      req.user.id,
    );
    return contents;
  }
}
