import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  Unique,
  ForeignKey,
  BelongsTo,
  BelongsToMany
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "../../accounts/entities/account.entity";
import { RelationshipOfRolesAndPosts } from "../../photos/entities/relationship-of-roles-and-posts.entity";
import { Photo } from "../../photos/entities/photo.entity";

@Table({tableName: "posts", timestamps: false})
export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  @AutoIncrement
  @PrimaryKey
  @Column({allowNull: false})
  id: number;
  @ForeignKey(() => Account)
  @Column({allowNull: false})
  account_id: number;
  @Column({allowNull: false})
  post_name: string;
  @Column
  post_description: string;
  @Column
  date_of_creation: Date = new Date();

  //

  @BelongsTo(() => Account)
  account: Account;
  @BelongsToMany(() => Photo, () => RelationshipOfRolesAndPosts)
  photos: Photo[];


}
