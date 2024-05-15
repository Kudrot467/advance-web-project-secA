import { IsEmail,  IsString,IsNotEmpty  } from "class-validator";
import { PartialType } from "@nestjs/mapped-types"; 
export class CreateRoomDto{
    @IsString()
    @IsNotEmpty() 
    Hotelname: string;

    @IsString()
    @IsNotEmpty() 
    price: string;

    @IsString()
    @IsNotEmpty() 
    location: string;

    @IsString()
    @IsNotEmpty() 
    type: string;

}



