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
Object.defineProperty(exports, "__esModule", { value: true });
class PostController {
    constructor(service) {
        this._service = service;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content } = req.body;
            const result = yield this._service.create({ title, content });
            return res.status(201).json(result);
        });
    }
    readById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this._service.readById(Number(id));
            return res.status(200).json(result);
        });
    }
    readByAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._service.readAll();
            return res.status(200).json(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, content } = req.body;
            const result = yield this._service.update(Number(id), { title, content });
            return res.status(200).json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield this._service.delete(Number(id));
            return res.status(200).end();
        });
    }
}
exports.default = PostController;
