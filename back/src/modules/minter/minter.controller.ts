import {
  Controller,
  Post,
  Put,
  Req,
  UseGuards,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { MinterService } from './minter.service';

import { MinterEntity } from '../../models';

@Controller('minter')
export class MinterController {
  constructor(private readonly minterService: MinterService) {}

  @Post()
  createMinter(@Body() minter: MinterEntity): Promise<MinterEntity> {
    return this.minterService.createMinter(minter);
  }

  @Put('visibility')
  @UseGuards(AuthGuard('jwt'))
  async updateProfileVisibility(
    @Req() req: any,
    @Body('id') id: number,
    @Body('isPrivate') isPrivate: boolean,
  ): Promise<void> {
    if (req.user.id !== id) {
      throw new Error(
        'You are not authorized to update this profile visibility',
      );
    }
    await this.minterService.updateProfileVisibility(id, isPrivate);
  }
  @Patch(':id')
  async updateUniqueUrl(
    @Param('id') id: number,
    @Body('uniqueUrl') newUrl: string,
  ): Promise<MinterEntity> {
    return this.minterService.updateUniqueUrl(id, newUrl);
  }
}
