import { Body, Controller, Post } from '@nestjs/common';

import { MinterService } from './minter.service';

import { MinterEntity } from '../../models';

@Controller('minter')
export class MinterController {
  constructor(private readonly minterService: MinterService) {}

  @Post()
  createMinter(@Body() minter: MinterEntity): Promise<MinterEntity> {
    return this.minterService.createMinter(minter);
  }
}
