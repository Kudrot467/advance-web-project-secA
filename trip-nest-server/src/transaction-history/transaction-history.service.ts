// transaction-history.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionHistory } from './entities/transaction-history.entity';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectRepository(TransactionHistory)
    private readonly transactionHistoryRepository: Repository<TransactionHistory>,
  ) {}

  async getUserTransactionHistory(
    userEmail: string,
  ): Promise<TransactionHistory[]> {
    return this.transactionHistoryRepository.find({
      where: { email: userEmail },
    });
  }

  async getAllTransactionHistory(): Promise<TransactionHistory[]> {
    return this.transactionHistoryRepository.find();
  }

  async searchTransactionHistory(email: string): Promise<TransactionHistory[]> {
    return this.transactionHistoryRepository.find({ where: { email: email } });
  }
}
