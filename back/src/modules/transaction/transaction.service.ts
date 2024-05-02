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
}
