import { Router, Request, Response } from "express";
import CommentController from "../controllers/CommentController";
import CommentService from "../services/CommentService";

const commentRoutes = Router();
const commentService = new CommentService();
const commentController = new CommentController(commentService);

commentRoutes
  .post('/comment', (req: Request, res: Response) => commentController.create(req, res))
  .get('/comment', (req: Request, res: Response) => commentController.readAll(req, res))
  .get('/comment/:id', (req: Request, res: Response) => commentController.readById(req, res))
  .put('/comment/:id', (req: Request, res: Response) => commentController.update(req, res))
  .delete('/comment/:id', (req: Request, res: Response) => commentController.delete(req, res));

export default commentRoutes;