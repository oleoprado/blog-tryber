import { ModelStatic, where } from "sequelize";
import Post from "../../database/models/Post";
import IPost from "../interfaces/IPost";
import IServicePost from "../interfaces/IServicePost";

export default class PostService implements IServicePost {
  protected model: ModelStatic<Post> = Post // modelStatic(type do sequelize) é a represetação das tabelas do db. Aqui esta inicializando a model.

  async create(dto: IPost): Promise<Post> {
    return await this.model.create({ ...dto });
  }

  async readAll(): Promise<Post[]> {
    return await this.model.findAll();
  }

  async readById(id: number): Promise<Post | null> {
    return await this.model.findByPk(id);
  }

  async update(id: number, dto: IPost): Promise<Post> {
    const post = await this.model.findByPk(id);
    if (!post) throw new Error(`Post with id ${id} not found`);
    await this.model.update({ ...dto }, { where: { id } });

    return post;
  }

  async delete(id: number): Promise<void> {
    const post = await this.model.findByPk(id);
    if (!post) throw new Error(`Post with id ${id} not found`);
    await this.model.destroy({ where: { id } });
  }
}