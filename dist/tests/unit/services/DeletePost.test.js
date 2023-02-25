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
const PostService_1 = __importDefault(require("../../../src/api/services/PostService"));
const Post_1 = __importDefault(require("../../../src/database/models/Post"));
describe('Teste de serviço: Delete Post', function () {
    afterEach(function () {
        sinon_1.default.restore();
    });
    it('Verificar se um Post é deletado com sucesso', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const reqParamsMock = 1;
            const outputMock = new Post_1.default({
                id: 1,
                title: 'Jest com Typescript',
                content: 'Não aprendemos a testar codigo em Typescript utilizando Jest',
            });
            sinon_1.default.stub(sequelize_1.Model, 'findByPk').resolves(outputMock);
            sinon_1.default.stub(sequelize_1.Model, 'destroy').resolves();
            const service = new PostService_1.default();
            const result = yield service.delete(reqParamsMock);
            (0, chai_1.expect)(result).to.be.undefined;
        });
    });
    it('Verifica se uma exceção é lançada ao passar um ID invalido', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const reqParamsMock = 10;
            const errorMock = `Post with id ${reqParamsMock} not found`;
            const service = new PostService_1.default();
            try {
                yield service.delete(reqParamsMock);
            }
            catch (error) {
                if (error instanceof Error)
                    (0, chai_1.expect)(error.message).to.equal(errorMock);
            }
        });
    });
});
