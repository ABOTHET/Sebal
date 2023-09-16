import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from "./entities/post.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postRep: typeof Post) {
  }
  async create(account_id: number, createPostDto: CreatePostDto) {
    const data = {account_id, ...createPostDto};
    const postFromDatabase: Post = await this.postRep.create(data);
    return postFromDatabase;
  }

  async findAll() {
    const postsFromDatabase: Post[] = await this.postRep.findAll();
    return postsFromDatabase;
  }

  async findAllByAccountId(account_id: number) {
    const options = {
      where: {
        account_id: account_id
      }
    }
    const postsFromDatabase: Post[] = await this.postRep.findAll(options);
    return postsFromDatabase;
  }

  async findOne(id: number) {
    const postFromDatabase: Post = await this.postRep.findByPk(id);
    return postFromDatabase;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
