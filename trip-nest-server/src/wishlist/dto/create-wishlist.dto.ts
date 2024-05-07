import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNumber } from "class-validator";

export class CreateWishlistDto {
    @ApiProperty()
    @IsNumber()
    userId: number;
  
    @ApiProperty()
    @IsIn(['room', 'flight', 'vehicle'])
    type: 'room' | 'flight' | 'vehicle';
  
    @ApiProperty()
    @IsNumber()
    itemId: number;
  }
  
  export class WishlistItemDto {
    @ApiProperty()
    @IsNumber()
    id: number;
  
    @ApiProperty()
    @IsIn(['room', 'flight', 'vehicle'])
    type: 'room' | 'flight' | 'vehicle';
  
    @ApiProperty()
    @IsNumber()
    itemId: number;
  }