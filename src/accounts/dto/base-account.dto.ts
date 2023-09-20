import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export abstract class BaseAccountDto {
  @IsNotEmpty({message: "Email не может быть пустым"})
  @IsEmail({}, {message: "Введите email"})
  email: string;
  @IsNotEmpty({message: "Пароль не может быть пустым"})
  @MinLength(6, {message: "Длина пароля не должна быть меньше 6 символов"})
  password: string;
}
