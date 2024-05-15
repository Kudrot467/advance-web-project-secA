import { Module } from '@nestjs/common';
import { adminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { Room } from 'src/admin/entities/admin.entity';
import { faq } from 'src/faq/entities/faq.entity';
import { AllUser } from 'src/all-user/entities/all-user.entity';

@Module({

  imports: [TypeOrmModule.forFeature([Admin,Room,faq,AllUser])],
  controllers: [AdminController],
  providers: [adminService],
})
export class AdminModule {}
