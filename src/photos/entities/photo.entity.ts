import { AutoIncrement, Column, PrimaryKey, Table, Model, Unique, ForeignKey, BelongsTo } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "../../accounts/entities/account.entity";

@Table({tableName: "photos", timestamps: false})
export class Photo extends Model<InferAttributes<Photo>, InferCreationAttributes<Photo>> {

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

}
