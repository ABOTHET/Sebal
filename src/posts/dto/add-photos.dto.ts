import { Allow } from "class-validator";

export class AddPhotosDto {

  @Allow()
  post_id: number;
  @Allow()
  photo_filenames: string[];

}