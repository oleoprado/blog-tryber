import { Router, Request, Response } from "express";
import CommentController from "../controllers/CommentController";
import CommentService from "../services/CommentService";

const commentRoutes = Router();
const commentService = new CommentService();
const commentController = new CommentController(commentService);

commentRoutes
  .post('/comment', (req: Request, res: Response) => commentController.create(req, res))
  .get('/comment', (req: Request, res: Response) => commentController.readAll(req, res));

export default commentRoutes;