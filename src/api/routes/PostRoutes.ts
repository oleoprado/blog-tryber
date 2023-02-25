import { Router, Request, Response } from 'express';
import PostController from '../controllers/PostController';
import PostService from '../services/PostService';

const postRoutes = Router();
const postService = new PostService();
const postController = new PostController(postService);

postRoutes
  .post('/post', (req: Request, res: Response) => postController.create(req, res))
  .get('/post', (req: Request, res: Response) => postController.readByAll(req, res))
  .get('/post/:id', (req: Request, res: Response) => postController.readById(req, res))
  .put('/post/:id', (req: Request, res: Response) => postController.update(req, res));

export default postRoutes;