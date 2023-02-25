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
const Comment_1 = __importDefault(require("../../database/models/Comment"));
const idNotFoundError_1 = __importDefault(require("../errors/idNotFoundError"));
class CommentService {
    constructor() {
        this.model = Comment_1.default;
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
            yield this._verifyIFCommentExist(id);
            const comment = yield this.model.findByPk(id);
            return comment;
        });
    }
    update(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._verifyIFCommentExist(id);
            yield this.model.update(Object.assign({}, dto), { where: { id } });
            const comment = yield this.model.findByPk(id);
            return comment;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._verifyIFCommentExist(id);
            yield this.model.destroy({ where: { id } });
        });
    }
    _verifyIFCommentExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.model.findByPk(id);
            if (!comment)
                throw new idNotFoundError_1.default(`Comment with id ${id} not found`);
        });
    }
}
exports.default = CommentService;
