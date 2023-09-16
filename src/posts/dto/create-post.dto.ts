import { Allow, IsNotEmpty } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  post_name: string;
  @Allow()
  post_description: string;
}
