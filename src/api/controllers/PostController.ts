import { Request, Response } from "express";
import IServicePost from "../interfaces/IServicePost";

export default class PostController {
  private _service: IServicePost;

  constructor(service: IServicePost) {
    this._service = service;
  }

  async create(req: Request, res: Response) {
    const { title, content } = req.body;
    const result = await this._service.create({ title, content });
    return res.status(201).json(result);
  }

  async readById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.readById(Number(id));
    return res.status(200).json(result);
  }

  async readByAll(_req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await this._service.update(Number(id), { title, content });
    return res.status(200).json(result);
  }
}