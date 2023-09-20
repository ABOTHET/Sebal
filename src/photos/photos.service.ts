import { Injectable, StreamableFile } from "@nestjs/common";
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FileToolsService } from "../file-tools/file-tools.service";
import { InjectModel } from "@nestjs/sequelize";
import { Photo } from "./entities/photo.entity";
import * as path from "path";
import { AccountPayload } from "../jwt/payload/account-payload";
import { Buffer } from "node:buffer";
import { createReadStream } from "fs";
import { Account } from "../accounts/entities/account.entity";

@Injectable()
export class PhotosService {

  constructor(@InjectModel(Photo) private fileRep: typeof Photo, private fileTools: FileToolsService) {
  }

  dirname: string = __dirname;
  folderPhotoName: string = "photos_database";
  pathToPhotoFolder: string = path.join(this.dirname, "..", "..", this.folderPhotoName);

  async create(accountPayload: AccountPayload, photo: Express.Multer.File) {
    const date_added = new Date();
    const arr: string[] = photo.originalname.split(".");
    arr[arr.length - 1] = ("-" + date_added.toLocaleDateString() + "." + date_added.getHours() + "h." + date_added.getMinutes() + "m." + date_added.getSeconds() + "s." + date_added.getMilliseconds() + "ms.");
    arr.push("webp");
    const fileName: string = arr.join("");
    const data = {
      account_id: accountPayload.id,
      photo_filename: fileName,
      date_added: date_added
    }
    await this.fileRep.create(data);
    const res: string = path.join(this.dirname, "..", "..", this.folderPhotoName, accountPayload.email);
    await this.fileTools.createFolder(res);
    const pathToFile: string = path.join(res, fileName);
    await this.fileTools.createFile(pathToFile);
    await this.fileTools.writeBufferToFile(pathToFile, photo.buffer);
    return fileName;
  }

  async findAllByAccountId(id: number) {
    const photosFromDatabase: Photo[] = await this.fileRep
      .findAll({where: {account_id: id}});
    const photos: string[] = [];
    photosFromDatabase.forEach((photo: Photo) => {
      photos.push(photo.photo_filename);
    });
    /*const pathToFolder: string = path.join(this.pathToPhotoFolder, accountPayload.email);
    photosFromDatabase.forEach((photo: Photo) => {
      const pathToFile: string = path.join(pathToFolder, photo.photo_filename);
      photos.push(pathToFile);
    });*/
    return photos;
  }

  /*async findAllByAccountId(accountPayload: AccountPayload) {
    const photosFromDatabase: Photo[] = await this.fileRep
      .findAll({where: {account_id: accountPayload.id}});
    const photos: Buffer[] = [];
    for (const photo of photosFromDatabase) {
      const pathToFile: string = path.join(this.pathToPhotoFolder, accountPayload.email);
      const buffer: Buffer = await this.fileTools.readBufferFromFile(pathToFile);
      photos.push(buffer);
    }
    return photos;
  }*/

  async findOne(account_id: number, filename: string) {
    try {
      const photo: Photo = await this.fileRep.findOne({where: {account_id: account_id}, include: {model: Account}});
      const email: string = photo.account.email;
      const pathToFile: string = path.join(this.pathToPhotoFolder, email, filename);
      const file = createReadStream(pathToFile);
      return file;
    } catch (error) {
      return null;
    }
  }

  async findOneFromDatabase(filename: string) {
    const photo: Photo = await this.fileRep.findOne({where: {photo_filename: filename}});
    return photo;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
