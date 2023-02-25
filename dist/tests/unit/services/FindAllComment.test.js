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
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const CommentService_1 = __importDefault(require("../../../src/api/services/CommentService"));
const Comment_1 = __importDefault(require("../../../src/database/models/Comment"));
describe('Testes de serviço: FindAll Comment', function () {
    afterEach(function () {
        sinon_1.default.restore();
    });
    it('Verifica se retorna todos os comentarios', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const outputMock = [new Comment_1.default({
                    id: 1,
                    content: 'que legal seu post, parabens',
                    postId: 1,
                })];
            sinon_1.default.stub(Comment_1.default, 'findAll').resolves(outputMock);
            const service = new CommentService_1.default();
            const result = yield service.readAll();
            (0, chai_1.expect)(result).to.be.equal(outputMock);
            (0, chai_1.expect)(result.length).to.be.equal(1);
        });
    });
});
