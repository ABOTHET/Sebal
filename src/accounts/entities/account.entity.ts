import { AutoIncrement, Column, PrimaryKey, Table, Model, Unique, HasOne, HasMany } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { AccountInformation } from "../account-information/entities/account-information.entity";
import { RefreshToken } from "../../refresh_tokens/entities/refresh-token.entity";
import { Post } from "../../posts/entities/post.entity";

@Table({tableName: "accounts", timestamps: false})
export class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
  @AutoIncrement
  @PrimaryKey
  @Column({allowNull: false})
  id: number;
  @Unique
  @Column({allowNull: false, validate: {isEmail: true}})
  email: string;
  @Column({allowNull: false})
  password: string;
  @Column({allowNull: false})
  date_of_creation: Date = new Date;
  @Column({allowNull: false})
  is_banned: boolean = false;
  @Column({allowNull: false})
  is_activated: boolean = false;

  //

  @HasOne(() => AccountInformation)
  account_information: AccountInformation;
  @HasOne(() => RefreshToken)
  refresh_token: RefreshToken;
  @HasMany(() => Post)
  posts: Post[];
}
