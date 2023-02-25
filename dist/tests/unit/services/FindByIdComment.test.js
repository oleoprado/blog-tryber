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
const sinon_1 = __importDefault(require("sinon"));
const Comment_1 = __importDefault(require("../../../src/database/models/Comment"));
const sequelize_1 = require("sequelize");
const CommentService_1 = __importDefault(require("../../../src/api/services/CommentService"));
const chai_1 = require("chai");
describe('Testes de serviço: FindById Comment', function () {
    afterEach(function () {
        sinon_1.default.restore();
    });
    it('Verifica se retorna o comentario referente ao ID informado', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const reqParamsMock = 1;
            const outputMock = new Comment_1.default({
                id: 1,
                content: 'que legal seu post, parabens',
                postId: 1,
            });
            sinon_1.default.stub(sequelize_1.Model, 'findByPk').resolves(outputMock);
            const service = new CommentService_1.default();
            const result = yield service.readById(reqParamsMock);
            (0, chai_1.expect)(result).to.be.equal(outputMock);
        });
    });
});
