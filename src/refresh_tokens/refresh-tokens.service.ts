import { Injectable } from '@nestjs/common';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { RefreshToken } from "./entities/refresh-token.entity";
import { InjectModel } from "@nestjs/sequelize";
import { Account } from "../accounts/entities/account.entity";

@Injectable()
export class RefreshTokensService {

  constructor(@InjectModel(RefreshToken) private refreshTokenRep: typeof RefreshToken) {
  }
  async create(createRefreshTokenDto: CreateRefreshTokenDto) {
    const refreshTokenFromDatabase: RefreshToken = await this.refreshTokenRep.create(createRefreshTokenDto);
    return refreshTokenFromDatabase;
  }

  async findOne(id: number) {
    return `This action returns a #${id} refreshToken`;
  }

  async findOneByRefreshToken(refresh_token: string) {
    const refreshTokenFromDatabase: RefreshToken = await this.refreshTokenRep.findOne({where: {refresh_token: refresh_token}, include: {model: Account}});
    return refreshTokenFromDatabase;
  }

  update(id: number, updateRefreshTokenDto: UpdateRefreshTokenDto) {
    return `This action updates a #${id} refreshToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} refreshToken`;
  }

}
