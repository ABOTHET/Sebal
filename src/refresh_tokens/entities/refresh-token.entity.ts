import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  Unique,
  HasOne,
  ForeignKey,
  BelongsTo, DataType
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "../../accounts/entities/account.entity";

@Table({tableName: "refresh_tokens", timestamps: false})
export class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<RefreshToken>> {
  @AutoIncrement
  @PrimaryKey
  @Column({allowNull: false})
  id: number;
  @Unique
  @ForeignKey(() => Account)
  @Column({allowNull: false})
  account_id: number;
  @Column({allowNull: false, type: DataType.TEXT})
  refresh_token: string;

  //

  @BelongsTo(() => Account)
  account: Account;
}
