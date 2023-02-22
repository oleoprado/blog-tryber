import Post from "../../database/models/Post";
import IPost from "./IPost";

export default interface IServicePost {
  create(dto: IPost): Promise<Post>;
  readAll(): Promise<Post[]>;
  readById(id: number): Promise<Post | null>;
  upadte(): Promise<void>;
}