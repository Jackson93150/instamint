import { Body, Controller, Post } from '@nestjs/common';
import { MinterEntity } from 'src/models';
import { MinterService } from './minter.service';

@Controller('minter')
export class MinterController {
  constructor(private readonly minterService: MinterService) {}

  @Post()
  createMinter(@Body() minter: MinterEntity): Promise<MinterEntity> {
    return this.minterService.createMinter(minter);
  }
}
