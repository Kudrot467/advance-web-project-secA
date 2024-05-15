import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async payment(
    @Body() body: { amount: number; method: string; trxId: string },
    @CurrentUser() currentUser: UserEntity,
  ) {
    const { amount, method, trxId } = body;
    const allowedMethods = [''];
    if (!allowedMethods.includes(method)) {
      throw new BadRequestException('Wrong method selected');
    }
    try {
      const payment = await this.paymentService.payment(
        currentUser.email,
        amount,
        method,
        trxId,
      );
      return { message: 'Payment successful', payment };
    } catch (error) {
      return { error: error.message };
    }
  }
}
