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
describe('Testes de serviço: Update Post', function () {
    afterEach(function () {
        sinon_1.default.restore();
    });
    it('Deve atualizar um Post corretamente', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const reqParamsMock = 1;
            const inputMock = {
                title: 'Jest com Typescript',
                content: 'Não aprendemos a testar codigo em Typescript utilizando Jest',
            };
            const outputMock = new Post_1.default({
                id: 1,
                title: 'Jest com Typescript',
                content: 'Não aprendemos a testar codigo em Typescript utilizando Jest',
            });
            sinon_1.default.stub(sequelize_1.Model, 'update').resolves();
            sinon_1.default.stub(sequelize_1.Model, 'findByPk').resolves(outputMock);
            const service = new PostService_1.default();
            yield service.update(reqParamsMock, inputMock);
            const result = yield service.readById(reqParamsMock);
            (0, chai_1.expect)(result).to.be.equal(outputMock);
        });
    });
    it('Deve retornar uma exceção caso não encontre o POST com o ID informado', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const invalidReqParamsMock = 10;
            const inputMock = { title: 'Jest', content: 'Não aprendemos ...' };
            const errorMock = `Post with id ${invalidReqParamsMock} not found`;
            const service = new PostService_1.default();
            try {
                yield service.update(invalidReqParamsMock, inputMock);
            }
            catch (error) {
                if (error instanceof Error)
                    (0, chai_1.expect)(error.message).to.equal(errorMock);
            }
        });
    });
});
