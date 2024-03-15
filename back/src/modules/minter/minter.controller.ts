import {
  Controller,
  Post,
  Put,
  Req,
  UseGuards,
  Body,
  Request,
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

  @Put('password')
  @UseGuards(AuthGuard('jwt'))
  async updateMinterPassword(
    @Request() req: any,
    @Body('password') password: string,
  ): Promise<void> {
    if (req.user.id) {
      await this.minterService.updatePassword(req.user.id, password);
    } else {
      throw new Error('Invalid Token');
    }
  }
}
