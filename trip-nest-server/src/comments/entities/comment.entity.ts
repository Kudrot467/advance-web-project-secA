import { ApiProperty } from "@nestjs/swagger";
import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('comments')
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  commentId: number;


  @ApiProperty()
  @Column({ nullable: false })
  commentText: string;

  @ApiProperty()
  @Column({ nullable: false })
  commentedBy:string;

  @ApiProperty()
  @Column({ nullable: false })
  postId:number;


}