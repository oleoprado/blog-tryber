import { ModelStatic } from "sequelize";
import Comment from "../../database/models/Comment";
import IdNotFoundError from "../errors/idNotFoundError";
import IComment from "../interfaces/IComment";
import IServiceComment from "../interfaces/IServiceComment";

export default class CommentService implements IServiceComment {
  protected model: ModelStatic<Comment> = Comment;
  
  async create(dto: IComment): Promise<Comment> {
    return await this.model.create({ ...dto });
  }

  async readAll(): Promise<Comment[]> {
    return await this.model.findAll({ attributes: { exclude: ['post_id'] }});
  }

  async readById(id: number): Promise<Comment> {
    await this._verifyIFCommentExist(id);
    const comment = await this.model.findOne({ where: { id }, attributes: { exclude: ['post_id'] }});
    return comment as Comment;
  }

  async update(id: number, dto: IComment): Promise<Comment> {
    await this._verifyIFCommentExist(id);
    await this.model.update({ ...dto }, { where: { id }});
    const comment = await this.model.findByPk(id);
    return comment as Comment;
  }

  async delete(id: number): Promise<void> {
    await this._verifyIFCommentExist(id);
    await this.model.destroy({ where: { id } });
  }

  private async _verifyIFCommentExist(id: number): Promise<void> {
    const comment = await this.model.findByPk(id);
    if (!comment) throw new IdNotFoundError(`Comment with id ${id} not found`);
  }
}