import {
  Controller,
  Post,
  Put,
  Req,
  UseGuards,
  BadRequestException,
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
  @UseGuards(AuthGuard('jwt'))
  @Put('visibility')
  async changeVisibility(
    @Req() req,
    @Body('minterId') minterId: number,
    @Body('isPrivate') isPrivate: boolean,
  ): Promise<any> {
    if (req.user.minterId !== minterId) {
      throw new BadRequestException(
        'You can only change visibility for your own profile',
      );
    }

    try {
      await this.minterService.updateProfileVisibility(minterId, isPrivate);
      return { success: true, message: 'Visibility updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
