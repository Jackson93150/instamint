import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionEntity } from '../../models';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async createTransaction(
    transaction: TransactionEntity,
  ): Promise<TransactionEntity> {
    const createdTransaction = await this.transactionRepository.save(
      transaction,
    );
    return createdTransaction;
  }

  async getTransactionPricesByTokenId(
    tokenId: number,
  ): Promise<{ price: number }[]> {
    const transactions = await this.transactionRepository.find({
      where: { tokenId, type: 'list' },
      select: ['price'],
    });

    if (transactions.length === 0) {
      return [{ price: 0.0 }, { price: 0.0 }];
    }

    return [
      { price: 0.0 },
      ...transactions.map((transaction) => ({ price: transaction.price })),
    ];
  }
}
