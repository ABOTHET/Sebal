import { AutoIncrement, Column, PrimaryKey, Table, Model, Unique, ForeignKey, BelongsTo } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "../../entities/account.entity";

@Table({tableName: "account_information", timestamps: false})
export class AccountInformation extends Model<InferAttributes<AccountInformation>, InferCreationAttributes<AccountInformation>> {
  @AutoIncrement
  @PrimaryKey
  @Column({allowNull: false})
  id: number;
  @Unique
  @ForeignKey(() => Account)
  @Column({allowNull: false})
  account_id: number;
  @Column
  name: string;
  @Column
  surname: string;
  @Column
  date_of_birth: Date;

  //

  @BelongsTo(() => Account)
  account: Account;

}
