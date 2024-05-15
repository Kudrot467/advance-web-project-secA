import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { DepositMoneyService } from 'src/deposit-money/deposit-money.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';

@Controller('deposits')
export class DepositController {
  constructor(private readonly depositService: DepositMoneyService) {}

  @Post()
  async deposit(
    @Body()
    body: {
      // email: string;
      amount: number;
      method: string;
      trxId: string;
      // action: string;
    },
    @CurrentUser() currentUser: UserEntity,
  ) {
    const { amount, method, trxId } = body;
    const allowedMethods = ['bKash', 'Nagad', 'Bank account'];
    if (method && !allowedMethods.includes(method)) {
      throw new BadRequestException('Wrong method selected');
    }
    try {
      const deposit = await this.depositService.deposit(
        currentUser.email,
        amount,
        method,
        trxId,
        // action,
      );
      return { message: 'Deposit successful', deposit };
    } catch (error) {
      return { error: error.message };
    }
  }
}
