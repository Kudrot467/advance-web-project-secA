import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {

  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  contact:string;

  @ApiProperty()
  @IsNotEmpty()
  image_url:string;

  @ApiProperty()
  @IsNotEmpty()
  email:string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password:string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role:string;
}
export class Login{
  @IsNotEmpty({ message: 'Please enter a valid email' }) 
  @IsEmail() 
  @IsString()
  email:string;

@IsNotEmpty({ message: 'Please enter a valid password' })
@IsString()
// @Length(6, undefined, { message: 'Password must be at least 6 characters long' })
// @Matches(/^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*].*[!@#$%^&*])/, { message: 'Password must include at least 2 special characters and 2 numbers' })
password:string;
}

