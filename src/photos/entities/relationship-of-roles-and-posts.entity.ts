import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Post } from "../../posts/entities/post.entity";
import { Photo } from "./photo.entity";

@Table({tableName: "relationship_of_roles_and_posts", timestamps: false})
export class RelationshipOfRolesAndPosts extends Model<InferAttributes<RelationshipOfRolesAndPosts>,
  InferCreationAttributes<RelationshipOfRolesAndPosts>> {

  @AutoIncrement
  @PrimaryKey
  @Column({allowNull: false})
  id: number;
  @ForeignKey(() => Post)
  @Column({allowNull: false})
  post_id: number;
  @ForeignKey(() => Photo)
  @Column({allowNull: false})
  photo_id: number;

}
