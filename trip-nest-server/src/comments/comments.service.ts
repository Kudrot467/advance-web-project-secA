import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto, PostCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment =await this.commentRepo.create(createCommentDto);
    return await this.commentRepo.save(comment);
  }

  async getPostComments(postId: number): Promise<PostCommentDto[]> {
    const comments = await this.commentRepo.find({ where: { postId } });
    // Map Comment entities to CreateCommentDto objects
    return comments.map(comment => ({
      commentText: comment.commentText,
      commentedBy: comment.commentedBy,
      postId: comment.postId,
    }));
  }
  async findAll() {
    return await this.commentRepo.find({});
  }

  async findById(id: number) {
    return await this.commentRepo.find({ where: { commentId : id} });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const existingComments = await this.findById(id);
    if (!existingComments || existingComments.length === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    const existingComment = existingComments[0]; // Access the first element of the array
    

    // Update the existing comment with properties from the updateCommentDto
    existingComment.commentText = updateCommentDto.commentText ?? existingComment.commentText;
    // Save the updated comment to the database
    return await this.commentRepo.save(existingComment);
  }

  async remove(id: number): Promise<void> {
    await this.commentRepo.delete(id);
  }
}
