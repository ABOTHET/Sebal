import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { env } from "process";
import { AccountsModule } from './accounts/accounts.module';
import { Account } from "./accounts/entities/account.entity";
import { AuthModule } from './auth/auth.module';
import { AccountInformation } from "./accounts/account-information/entities/account-information.entity";
import { MyJwtModule } from './jwt/my-jwt.module';
import { RefreshTokensModule } from './refresh_tokens/refresh-tokens.module';
import { RefreshToken } from "./refresh_tokens/entities/refresh-token.entity";
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/entities/post.entity";
import { PhotosModule } from './photos/photos.module';
import { Photo } from "./photos/entities/photo.entity";
import { FileToolsModule } from './file-tools/file-tools.module';
import { FileToolsService } from "./file-tools/file-tools.service";
import * as path from "path";
import { RelationshipOfRolesAndPosts } from "./photos/entities/relationship-of-roles-and-posts.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/env/.env',
      isGlobal: true,
  }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: env["DB_HOST"],
      port: Number(env["DB_PORT"]),
      username: env["DB_USERNAME"],
      password: env["DB_PASSWORD"],
      database: env["DB_DATABASE"],
      models: [Account, AccountInformation, RefreshToken, Post, Photo, RelationshipOfRolesAndPosts],
      synchronize: true,
      autoLoadModels: true,
      /*sync: {
        force: true
      },*/
      logging: false
    }),
    AccountsModule,
    AuthModule,
    MyJwtModule,
    RefreshTokensModule,
    PostsModule,
    PhotosModule,
    FileToolsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

  constructor(private fileTools: FileToolsService) {
    (async () => {
      let dirname: string = __dirname;
      let folderPhotoName: string = "photos_database";
      let res: string = path.join(dirname, "..", folderPhotoName);
      await this.fileTools.deleteFolder(res);
      await this.fileTools.createFolder(res);
    })();
  }

}
