import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { DraftService } from './draft.service';

import { DraftEntity } from '../../models';

@Controller('draft')
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createContent(@Body() draft: DraftEntity): Promise<DraftEntity> {
    return this.draftService.createDraft(draft);
  }

  @Get('minter')
  @UseGuards(AuthGuard('jwt'))
  async getDraftByMinterId(@Req() req: any): Promise<DraftEntity[]> {
    const drafts = await this.draftService.getDraftByMinterId(req.user.id);
    return drafts;
  }

  @Put(':id')
  async updateDraft(
    @Param('id') id: number,
    @Body() draftData: Partial<DraftEntity>,
  ): Promise<DraftEntity> {
    return await this.draftService.updateDraft(id, draftData);
  }
}
