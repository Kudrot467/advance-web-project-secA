import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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
}
