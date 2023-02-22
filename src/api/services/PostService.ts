import Post from "../../database/models/Post";
import IPost from "../interfaces/IPost";
import IServicePost from "../interfaces/IServicePost";

export default class PostService implements IServicePost {
  create(dto: IPost): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  
}