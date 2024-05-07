import { Controller, Get, Post, Body, Param, Delete, ValidationPipe } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto, WishlistItemDto } from './dto/create-wishlist.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Wish List')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @ApiCreatedResponse({
    description:'Wishlist added'
  })
  @Post('addToWishlist')
  addToWishlist(@Body(ValidationPipe) addWishlistItemDto: CreateWishlistDto): Promise<WishlistItemDto> {
    return this.wishlistService.addToWishlist(addWishlistItemDto);
  }

  @ApiBadRequestResponse({
    description:'invalid user id'
  })
  
  @Get(':userId')
  getUserWishlist(@Param('userId') userId: number): Promise<WishlistItemDto[]> {
    return this.wishlistService.getUserWishlist(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(+id);
  }
}
