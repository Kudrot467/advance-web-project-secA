import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto, WishlistItemDto } from './dto/create-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistItemRepository: Repository<Wishlist>,
  ) {}

  async addToWishlist(addWishlistItemDto:CreateWishlistDto): Promise<WishlistItemDto> {
    const wishlistItem = this.wishlistItemRepository.create(addWishlistItemDto);
    await this.wishlistItemRepository.save(wishlistItem);
    return wishlistItem;
  }

  async getUserWishlist(userId: number): Promise<WishlistItemDto[]> {
    return this.wishlistItemRepository.find({ where: { userId } });
  }

  async remove(id: number): Promise<void> {
    const itemToRemove = await this.wishlistItemRepository.findBy({itemId : id});
    if (!itemToRemove) {
      throw new NotFoundException(`Wishlist item with ID ${id} not found`);
    }
    await this.wishlistItemRepository.remove(itemToRemove);
  }
}
