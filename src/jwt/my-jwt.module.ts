import { Module } from '@nestjs/common';
import { MyJwtService } from './my-jwt.service';
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [MyJwtService],
  imports: [JwtModule],
  exports: [MyJwtService]
})
export class MyJwtModule {}
