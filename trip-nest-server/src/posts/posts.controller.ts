import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiCreatedResponse({
    description:'Post created'
  })
  @Post('createPost')
  create(@Body((new ValidationPipe())) createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiBadRequestResponse({
    description:'No Posts to show'
  })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiBadRequestResponse({
    description:'Invalid post id!'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findById(+id);
  }

  @ApiBadRequestResponse({
    description:'No existing post'
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
