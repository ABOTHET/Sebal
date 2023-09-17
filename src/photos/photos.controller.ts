import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  StreamableFile,
  ParseFilePipeBuilder, HttpStatus, UseGuards, Header
} from "@nestjs/common";
import { PhotosService } from "./photos.service";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Payload } from "../decorators/account-payload/account-payload.decorator";
import { AccountPayload } from "../jwt/payload/account-payload";
import { AuthGuard } from "../guards/auth/auth.guard";
import { Buffer } from "node:buffer";
import { createReadStream } from 'fs';

@Controller("photos")
@UseGuards(AuthGuard)
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {
  }

  @Post()
  @UseInterceptors(FilesInterceptor("files"))
  async create(@Payload() accountPayload: AccountPayload,
         @UploadedFiles(
           new ParseFilePipeBuilder()
             .addFileTypeValidator({
               fileType: "webp"
             })
             .addMaxSizeValidator({
               maxSize: 5242880
             })
             .build({
               errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
             })) files: Array<Express.Multer.File>) {
    const array: string[] = [];
    for (const file of files) {
      if (file.size == 0) {
        continue;
      }
      const filename: string = await this.photosService.create(accountPayload, file);
      array.push(filename);
    }
    return array;
  }

  @Get()
  async findAllByAccountId(@Payload() accountPayload: AccountPayload) {
    const photos: string[] = await this.photosService.findAllByAccountId(accountPayload);
    return photos;
  }

  /*@Get()
  async findAll() {
    return this.photosService.findAll();
  }*/

  @Get(":account_id/:filename")
  @Header("Content-type", "image/webp")
  async findOne(@Param("filename") filename: string, @Param("account_id") account_id: string) {
    const file = await this.photosService.findOne(+account_id, filename);
    if (!file) {
      return;
    }
    return new StreamableFile(file);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photosService.update(+id, updatePhotoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.photosService.remove(+id);
  }
}
