import {
  Controller,
  Post,
  Put,
  Req,
  UseGuards,
  Body,
  Delete,
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

  @Put('unique-url')
  @UseGuards(AuthGuard('jwt'))
  async updateUniqueUrl(
    @Req() req: any,
    @Body('uniqueUrl') newUrl: string,
  ): Promise<void> {
    await this.minterService.updateUniqueUrl(req.user.id, newUrl);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async deleteMinter(@Req() req: any): Promise<string> {
    try {
      await this.minterService.deleteMinter(req.user.id);
      return 'Account successfully deleted';
    } catch {
      throw new Error('Autorization required to delete this account !');
    }
  }

  @Put('username')
  @UseGuards(AuthGuard('jwt'))
  async updateUsername(
    @Req() req: any,
    @Body('username') newUsername: string,
  ): Promise<void> {
    await this.minterService.updateUsername(req.user.id, newUsername);
  }
}
