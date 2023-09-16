import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Payload } from "../decorators/account-payload/account-payload.decorator";
import { AuthGuard } from "../guards/auth/auth.guard";
import { AccountPayload } from "../jwt/payload/account-payload";
import { Post as PT } from "./entities/post.entity";
import { PostModel } from "./models/post.model";

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Payload() accountPayload: AccountPayload, @Body() createPostDto: CreatePostDto) {
    const postFromDatabase: PT = await this.postsService.create(accountPayload.id, createPostDto);
    const postModel: PostModel = new PostModel(postFromDatabase);
    return postModel;
  }

  @Get()
  async findAll() {
    const postsFromDatabase: PT[] = await this.postsService.findAll();
    const postsModel: PostModel[] = [];
    postsFromDatabase.forEach((post: PT) => {
      postsModel.push(new PostModel(post));
    });
    return postsModel;
  }

  /*@Get(':id')
  async findOne(@Param('id') id: string) {
    const postFromDatabase: PT = await this.postsService.findOne(+id);
    const postModel: PostModel = new PostModel(postFromDatabase);
    return postModel;
  }*/

  @Get(":account_id")
  async findAllByAccountId(@Param("account_id") account_id: string) {
    const postsFromDatabase: PT[] = await this.postsService.findAllByAccountId(+account_id);
    const postsModel: PostModel[] = [];
    postsFromDatabase.forEach((post: PT) => {
      postsModel.push(new PostModel(post));
    });
    return postsModel;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
