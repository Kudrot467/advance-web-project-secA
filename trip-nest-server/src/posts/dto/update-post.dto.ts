import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty()
    @IsOptional()
    @IsString()
    postTitle?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    postedFor?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    postDetails?: string;
  
}
