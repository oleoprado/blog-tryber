import { Request, Response } from "express";
import IServiceComment from "../interfaces/IServiceComment";

export default class CommentController {
  private _service: IServiceComment;

  constructor(service: IServiceComment) {
    this._service = service;
  }

  async create(req: Request, res: Response) {
    const { content, postId } = req.body;
    const result = await this._service.create({ content, postId });
    
    return res.status(201).json(result);
  }

  async readAll(req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }

  async readById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.readById(Number(id));
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { content, postId } = req.body;
    const result = await this._service.update(Number(id), {content, postId});
    return res.status(200).json(result);
  }
}