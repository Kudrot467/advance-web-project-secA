import { Controller, Get, Post, Body,Query, Patch, Param, Delete ,ValidationPipe} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('reviewrating')
  create(@Body(ValidationPipe) createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get('seereviews')
async getReviews(@Query('hotelname') hotelname: string, @Query('location') location: string) {
  return this.reviewService.getReviews(hotelname, location);
}

 
}
