// import { PartialType } from '@nestjs/mapped-types';
// import { CreateDepositMoneyDto } from './create-deposit-money.dto';

// export class UpdateDepositMoneyDto extends PartialType(CreateDepositMoneyDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateDepositMoneyDto } from './create-deposit-money.dto';

export class UpdateDepositMoneyDto extends PartialType(CreateDepositMoneyDto) {}
