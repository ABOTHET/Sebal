import { Post } from "../entities/post.entity";

export class PostModel {

  id: number;
  account_id: number;
  post_name: string;
  post_description: string;
  date_of_creation: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.account_id = post.account_id;
    this.post_name = post.post_name;
    this.post_description = post.post_description;
    this.date_of_creation = post.date_of_creation;
  }

}