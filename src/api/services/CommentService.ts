import { ModelStatic } from "sequelize";
import Comment from "../../database/models/Comment";
import IComment from "../interfaces/IComment";
import IServiceComment from "../interfaces/IServiceComment";

export default class CommentService implements IServiceComment {
  protected model: ModelStatic<Comment> = Comment;
  
  async create(dto: IComment): Promise<Comment> {
    return await this.model.create({ ...dto });
  }

  async readAll(): Promise<Comment[]> {
    return await this.model.findAll();
  }

  async readById(id: number): Promise<Comment> {
    await this._verifyIFCommentExist(id);
    const comment = await this.model.findByPk(id);
    return comment as Comment;
  }

  private async _verifyIFCommentExist(id: number): Promise<void> {
    const comment = await this.model.findByPk(id);
    if (!comment) throw new Error(`Comment with id ${id} not found`);
  }
}