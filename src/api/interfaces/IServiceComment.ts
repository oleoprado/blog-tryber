import Comment from "../../database/models/Comment";
import IComment from "./IComment";

export default interface IServiceComment {
  create(dto: IComment): Promise<Comment>;
  readAll(): Promise<Comment[]>;
  readById(id: number): Promise<Comment>;
  // update(id: number, dto: IComment): Promise<Comment>;
  // delete(id: number): Promise<void>;
}

