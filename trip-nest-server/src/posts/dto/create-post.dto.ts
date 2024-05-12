import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNotEmpty } from 'class-validator';
export class CreatePostDto {

    postId:number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image_url: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    postedBy: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    postTitle: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    postedFor: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    postDetails: string;
  
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    postedDate: string;
}
