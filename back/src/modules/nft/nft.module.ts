import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NftController } from './nft.controller';
import { NftService } from './nft.service';

import { NftEntity } from '../../models';

@Module({
  imports: [TypeOrmModule.forFeature([NftEntity])],
  controllers: [NftController],
  providers: [NftService],
  exports: [NftService],
})
export class NftModule {}
