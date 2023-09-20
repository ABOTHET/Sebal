import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Photo } from "./entities/photo.entity";
import { FileToolsModule } from "../file-tools/file-tools.module";
import { MyJwtModule } from "../jwt/my-jwt.module";

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [FileToolsModule, SequelizeModule.forFeature([Photo]), MyJwtModule],
  exports: [PhotosService]
})
export class PhotosModule {}
