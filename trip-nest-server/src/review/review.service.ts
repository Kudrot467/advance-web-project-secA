import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { review } from 'src/review/entities/review.entity';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(review) private readonly reviewRepo: Repository<review>,
    
  ) {}


  async create(createReveiwDto: CreateReviewDto) {
    const revieew = await this.reviewRepo.create(createReveiwDto);
    return await this.reviewRepo.save(revieew);
  }

  async getReviews(hotelname: string, location: string) {
    return this.reviewRepo.find({
      where: { hotelname, location },
      select: ['review', 'rating']
    });
  }

  
}
