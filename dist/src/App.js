"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const PostRoutes_1 = __importDefault(require("./api/routes/PostRoutes"));
const CommentRoutes_1 = __importDefault(require("./api/routes/CommentRoutes"));
const ErrorHandler_1 = __importDefault(require("./api/middlewares/ErrorHandler"));
class App {
    constructor() {
        this.app = (0, express_1.default)(); //inicializar o express
        this.initAuthHeader();
        this.initRoutes();
        this.initMiddleware();
    }
    // FIXME: este metodo configura acesso de entrada a API
    initAuthHeader() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express_1.default.json());
        this.app.use(accessControl);
    }
    // FIXME: inicializar as rotas aqui
    initRoutes() {
        this.app.use(PostRoutes_1.default);
        this.app.use(CommentRoutes_1.default);
    }
    initMiddleware() {
        this.app.use(ErrorHandler_1.default.handle);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.default = App;
