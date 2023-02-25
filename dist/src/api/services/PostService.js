"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../database/models/Post"));
const idNotFoundError_1 = __importDefault(require("../errors/idNotFoundError"));
class PostService {
    constructor() {
        this.model = Post_1.default; // modelStatic(type do sequelize) é a represetação das tabelas do db. Aqui esta inicializando a model.
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(Object.assign({}, dto));
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findAll();
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._verifyIfPostExist(id);
            const post = yield this.model.findByPk(id);
            return post;
        });
    }
    update(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._verifyIfPostExist(id);
            yield this.model.update(Object.assign({}, dto), { where: { id } });
            const updatedPost = yield this.model.findByPk(id);
            return updatedPost;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._verifyIfPostExist(id);
            yield this.model.destroy({ where: { id } });
        });
    }
    _verifyIfPostExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.model.findByPk(id);
            if (!post)
                throw new idNotFoundError_1.default(`Post with id ${id} not found`);
        });
    }
}
exports.default = PostService;
