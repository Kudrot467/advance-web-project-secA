import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { UsersService } from '../users/users.service'; // Import UsersService

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly usersService: UsersService, // Inject UsersService
  ) {}

  async payment(
    email: string,
    amount: number,
    method: string,
    trxId: string,
  ): Promise<Payment> {
    // Retrieve user's account balance
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if account balance is sufficient
    if (user.accountBalance < amount) {
      throw new Error('Insufficient balance');
    }

    // Deduct payment amount from account balance
    user.accountBalance -= amount;

    // Save payment transaction
    const payment = new Payment();
    payment.email = email;
    payment.amount = amount;
    payment.method = method;
    payment.trxId = trxId;
    await Promise.all([
      this.paymentRepository.save(payment),
      this.usersService.updateUserAccountBalancePayment(
        email,
        user.accountBalance,
      ),
    ]);

    return payment;
  }
}
