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
const sequelize_1 = require("sequelize");
const sinon_1 = __importDefault(require("sinon"));
const CommentService_1 = __importDefault(require("../../../src/api/services/CommentService"));
const Comment_1 = __importDefault(require("../../../src/database/models/Comment"));
describe('Teste de serviço: Update comment', function () {
    afterEach(function () {
        sinon_1.default.restore();
    });
    it('Verifica se um comment é atualizado com sucesso', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const reqParamsMock = 1;
            const inputMock = { content: 'foo', postId: 2 };
            const outputMock = new Comment_1.default({
                id: 1,
                content: 'foo',
                postId: 2
            });
            sinon_1.default.stub(sequelize_1.Model, 'update').resolves();
            sinon_1.default.stub(sequelize_1.Model, 'findByPk').resolves(outputMock);
            const service = new CommentService_1.default();
            yield service.update(reqParamsMock, inputMock);
            const result = yield service.readById(reqParamsMock);
            (0, chai_1.expect)(result).to.be.equal(outputMock);
        });
    });
    it('Verifica se uma exceção é lançada', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const invalidReqParamMock = 420;
            const inputMock = { content: 'foo', postId: 1 };
            const errorMock = `Comment with id ${invalidReqParamMock} not found`;
            const service = new CommentService_1.default();
            try {
                yield service.update(invalidReqParamMock, inputMock);
            }
            catch (error) {
                if (error instanceof Error)
                    (0, chai_1.expect)(error.message).to.be.equal(errorMock);
            }
        });
    });
});
