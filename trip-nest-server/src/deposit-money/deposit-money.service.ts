import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepositMoney } from 'src/deposit-money/entities/deposit-money.entity';
import { UsersService } from '../users/users.service';
// import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class DepositMoneyService {
  constructor(
    @InjectRepository(DepositMoney)
    private readonly depositMoneyRepository: Repository<DepositMoney>,
    private readonly usersService: UsersService, // Inject UsersService
  ) {}

  async deposit(
    email: string,
    amount: number,
    method: string,
    trxId: string,
  ): Promise<DepositMoney> {
    // Update user's account balance directly
    await this.usersService.updateUserAccountBalance(email, amount);

    // Create deposit transaction
    const deposit = new DepositMoney();
    deposit.email = email;
    deposit.amount = amount;
    deposit.method = method;
    deposit.trxId = trxId;

    // Save deposit transaction
    return await this.depositMoneyRepository.save(deposit);
  }
}
