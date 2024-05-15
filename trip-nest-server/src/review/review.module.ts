import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { review } from 'src/review/entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({

  imports: [TypeOrmModule.forFeature([review])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
