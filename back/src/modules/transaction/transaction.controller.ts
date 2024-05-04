import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TransactionService } from './transaction.service';

import { TransactionEntity } from '../../models';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createNft(
    @Body() transaction: TransactionEntity,
  ): Promise<TransactionEntity> {
    return this.transactionService.createTransaction(transaction);
  }

  @Get('prices/:tokenId')
  async getTransactionPricesByTokenId(
    @Param('tokenId') tokenId: number,
  ): Promise<{ price: number }[]> {
    return this.transactionService.getTransactionPricesByTokenId(tokenId);
  }
}
