import {
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  Body,
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
  @Put('changePassword')
  @UseGuards(AuthGuard('jwt'))
  async updateProfilePassword(
    @Req() req: any,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ): Promise<void> {
    const minterId = req.user.id;
    await this.minterService.updateProfilePassword(
      minterId,
      oldPassword,
      newPassword,
    );
  }
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(
    @Req() req: any,
  ): Promise<{ username: string; email: string }> {
    const id = req.user.id;
    const minterProfile = await this.minterService.getUserProfile(id);
    return { username: minterProfile.username, email: minterProfile.email };
  }
  @Put('changeEmail')
  @UseGuards(AuthGuard('jwt'))
  async updateProfileEmail(
    @Req() req: any,
    @Body('newEmail') newEmail: string,
  ): Promise<void> {
    const id = req.user.id;
    await this.minterService.updateProfileEmail(id, newEmail);
  }
}
