import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MyJwtModule } from "../jwt/my-jwt.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "./entities/post.entity";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [MyJwtModule, SequelizeModule.forFeature([Post])]
})
export class PostsModule {}
