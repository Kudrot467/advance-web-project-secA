import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, PostCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiCreatedResponse({
    description:'Comments created'
  })
  @Post('createComment')
  create(@Body((new ValidationPipe())) createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }


  @Get(':postId')
  getPostComments(@Param('postId') postId: number): Promise<PostCommentDto[]> {
    return this.commentsService.getPostComments(postId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
