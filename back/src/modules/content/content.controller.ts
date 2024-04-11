import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('firebase')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async createContentFirebase(
    @Req() req: any,
    @UploadedFile() file,
  ): Promise<string> {
    const url = await this.contentService.uploadFirebase(req.user.id, file);
    return url;
  }

  @Delete('firebase/:name')
  @UseGuards(AuthGuard('jwt'))
  async deleteContent(
    @Req() req: any,
    @Param('name') name: string,
  ): Promise<void> {
    await this.contentService.deleteContent(req.user.id, name);
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
