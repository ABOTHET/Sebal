import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from "./entities/post.entity";
import { InjectModel } from "@nestjs/sequelize";
import { AddPhotosDto } from "./dto/add-photos.dto";
import { AccountPayload } from "../jwt/payload/account-payload";
import { WhatAreYouDoing } from "./exceptions/what-are-you-doing";
import { Photo } from "../photos/entities/photo.entity";
import { PhotosService } from "../photos/photos.service";

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postRep: typeof Post, private photosService: PhotosService) {
  }
  async create(account_id: number, createPostDto: CreatePostDto) {
    const data = {account_id, ...createPostDto};
    const postFromDatabase: Post = await this.postRep.create(data);
    return postFromDatabase;
  }

  async findAll() {
    const postsFromDatabase: Post[] = await this.postRep.findAll({include: {model: Photo}});
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

  async addPhotoToPost(accountPayload: AccountPayload, addPhotosDto: AddPhotosDto) {
    const postFromDatabase: Post = await this.postRep
      .findOne({where: {account_id: accountPayload.id, id: addPhotosDto.post_id}});
    if (!postFromDatabase) {
      throw new WhatAreYouDoing();
    }
    const filenames: string[] = addPhotosDto.photo_filenames;
    for (const filename of filenames) {
      const photoFromDatabase: Photo = await this.photosService.findOneFromDatabase(filename);
      if (!(photoFromDatabase.account_id == accountPayload.id)) {
        continue;
      }
      await postFromDatabase.$add("photos", photoFromDatabase.id);
    }
  }
}
