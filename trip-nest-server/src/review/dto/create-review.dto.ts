import { IsEmail,  IsString,IsNotEmpty,IsNumber  } from "class-validator";
import { PartialType } from "@nestjs/mapped-types"; 
export class CreateReviewDto{
    @IsString()
    @IsNotEmpty() 
    hotelname: string;

    @IsString()
    @IsNotEmpty() 
    location: string;

    @IsString()
     
    review: string;
    @IsString()
    rating:string

}



