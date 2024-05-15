// import { Module } from '@nestjs/common';
// import { PaymentService } from './payment.service';
// import { PaymentController } from './payment.controller';

// @Module({
//   controllers: [PaymentController],
//   providers: [PaymentService],
// })
// export class PaymentModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), UsersModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
