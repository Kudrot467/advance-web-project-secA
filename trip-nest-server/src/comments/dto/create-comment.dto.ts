import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
   
        commentId:number;
        @ApiProperty()
        commentText: string;
      
        @ApiProperty()
        commentedBy: string;
      
        @ApiProperty()
        postId: number;
}
export class PostCommentDto {
   
        @ApiProperty()
        commentText: string;
      
        @ApiProperty()
        commentedBy: string;
      
        @ApiProperty()
        postId: number;
}
