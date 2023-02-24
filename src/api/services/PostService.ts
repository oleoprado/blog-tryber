import { ModelStatic } from "sequelize";
import Post from "../../database/models/Post";
import IdNotFoundError from "../errors/idNotFoundError";
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

  async readById(id: number): Promise<Post> {
    await this._verifyIfPostExist(id);
   
    const post = await this.model.findByPk(id);
    return post as Post;
  }

  async update(id: number, dto: IPost): Promise<Post> {
    await this._verifyIfPostExist(id);

    await this.model.update({ ...dto }, { where: { id } });
    const updatedPost = await this.model.findByPk(id);
    return updatedPost as Post;
  }

  async delete(id: number): Promise<void> {
    await this._verifyIfPostExist(id);
    await this.model.destroy({ where: { id } });
  }

  private async _verifyIfPostExist(id: number): Promise<void> {    
    const post = await this.model.findByPk(id);
    if (!post) throw new IdNotFoundError(`Post with id ${id} not found`);
  }
}

