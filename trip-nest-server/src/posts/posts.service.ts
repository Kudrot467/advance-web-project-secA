import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
     const post =await this.postRepo.create(createPostDto);
    return await this.postRepo.save(post);
  }

  async findAll() {
    return await this.postRepo.find({});
  }

  async findById(id: number) {
    return await this.postRepo.find({ where: { postId : id} });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const existingPosts = await this.findById(id);
    if (!existingPosts || existingPosts.length === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    const existingPost = existingPosts[0]; // Access the first element of the array
    
    // Update the existing post with properties from the updatePostDto
    existingPost.postTitle = updatePostDto.postTitle ?? existingPost.postTitle;
    existingPost.postedFor = updatePostDto.postedFor ?? existingPost.postedFor;
    existingPost.postDetails = updatePostDto.postDetails ?? existingPost.postDetails;

    // Save the updated post to the database
    return await this.postRepo.save(existingPost);
}

  async remove(id: number): Promise<void> {
    const existingPost = await this.findById(id);
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.postRepo.delete(id);
  }
}
