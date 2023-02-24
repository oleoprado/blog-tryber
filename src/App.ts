import 'express-async-errors';
import express from 'express';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express(); //inicializar o express
    this.initAuthHeader();
    this.initRoutes();
  }

  // FIXME: este metodo configura acesso de entrada a API
  private initAuthHeader(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  // FIXME: inicializar as rotas aqui
  private initRoutes(): void {

  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}