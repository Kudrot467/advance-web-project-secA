import { IsEmail,  IsString,IsNotEmpty  } from "class-validator";
import { PartialType } from "@nestjs/mapped-types"; 
export class CreateFaqDto{
    @IsString()
    @IsNotEmpty() 
    question: string;

    

    @IsString()
    @IsNotEmpty() 
    answer: string;

}



