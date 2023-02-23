import { ModelStatic } from "sequelize";
import Comment from "../../database/models/Comment";
import Post from "../../database/models/Post";
import IComment from "../interfaces/IComment";
import IPost from "../interfaces/IPost";
import IServiceComment from "../interfaces/IServiceComment";

export default class CommentService implements IServiceComment {
  protected model: ModelStatic<Comment> = Comment;

  create(dto: IComment): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  readAll(): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  readById(id: string): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  update(id: number, dto: IComment): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}