import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class Post {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  postId: number;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  postTitle: string;

  @ApiProperty()
  @Column({ nullable: false })
  postedFor: string;

  @ApiProperty()
  @Column({ nullable: false })
  postDetails: string;

  @ApiProperty()
  @Column({ nullable: false })
  postedBy:string;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: false })
  postedDate: Date;
}
