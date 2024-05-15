import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositMoney } from './entities/deposit-money.entity';
import { DepositMoneyService } from './deposit-money.service';
import { DepositController } from './deposit-money.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([DepositMoney]), UsersModule],
  controllers: [DepositController],
  providers: [DepositMoneyService],
  exports: [DepositMoneyService],
})
export class DepositMoneyModule {}
