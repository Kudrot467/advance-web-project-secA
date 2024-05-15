import { IsEmail,  IsString,IsNotEmpty  } from "class-validator";
import { PartialType } from "@nestjs/mapped-types"; 
export class CreateAdminDto{
    @IsString()
    @IsNotEmpty() 
    name: string;

    @IsEmail()
    @IsNotEmpty() 
    email: string;

    @IsString()
    @IsNotEmpty() 
    password: string;

}



