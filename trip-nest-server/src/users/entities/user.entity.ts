import { Entity,
         PrimaryGeneratedColumn,
          Column, 
          BeforeInsert,
         } 
    from "typeorm";

import * as bcrypt from 'bcrypt';
import { ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  userId: number;

  @ApiProperty()
  @Column({ nullable: false })
  username: string;

  @ApiProperty()
  @Column({ nullable: false })
  contact:string;

  @ApiProperty()
  @Column({ nullable: false })
  image_url:string;

  @ApiProperty()
  @Column({ nullable: false })
  email:string;

  @ApiProperty()
  @Column({ nullable: false })
  password: string;

  @ApiProperty()
  @Column({ nullable: false })
  role: string;
}
