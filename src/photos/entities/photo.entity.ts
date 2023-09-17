import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  Unique,
  ForeignKey,
  BelongsTo,
  DataType, BelongsToMany, HasOne
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "../../accounts/entities/account.entity";
import { Post } from "../../posts/entities/post.entity";
import { RelationshipOfRolesAndPosts } from "./relationship-of-roles-and-posts.entity";
import { AccountInformation } from "../../accounts/account-information/entities/account-information.entity";

@Table({tableName: "photos", timestamps: false})
export class Photo extends Model<InferAttributes<Photo>, InferCreationAttributes<Photo>> {

  @AutoIncrement
  @PrimaryKey
  @Column({allowNull: false})
  id: number;
  @ForeignKey(() => Account)
  @Column({allowNull: false})
  account_id: number;
  @Unique
  @Column({allowNull: false, type: DataType.TEXT})
  photo_filename: string;
  @Column
  date_added: Date;

  //

  @BelongsTo(() => Account)
  account: Account;
  @BelongsToMany(() => Post, () => RelationshipOfRolesAndPosts)
  posts: Post[];
  @HasOne(() => AccountInformation)
  acc_inf: AccountInformation;

}
