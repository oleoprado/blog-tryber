"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const sequelize_1 = require("sequelize");
const sinon_1 = __importDefault(require("sinon"));
const App_1 = __importDefault(require("../../src/App"));
chai_1.default.use(chai_http_1.default); //p/ simular requisições Http
describe('Testes para rota Post', function () {
    const app = new App_1.default(); // instanciar o app p/ simular a requisição
    afterEach(function () {
        sinon_1.default.restore();
    });
    it('Metodo POST: Deve cadastrar um Post com sucesso', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // arrange
            const post = {
                title: 'Post teste',
                content: 'Meu primeiro post'
            };
            sinon_1.default.stub(sequelize_1.Model, 'create').resolves();
            // action
            const response = yield chai_1.default.request(app.app).post('/post').send(post); // simular req via metodo http POST, para a rota '/post' e enviar o post
            // assertion
            (0, chai_1.expect)(response.status).to.be.equal(201);
        });
    });
    it('Metodo POST: Deve cadastrar um Post com sucesso e retornar o objeto criado', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // arrange
            const inputMock = {
                title: 'Typescript',
                content: 'Typescript é uma boa ferramenta....'
            };
            const outputMock = {
                id: 1,
                title: 'Typescript',
                content: 'Typescript é uma boa ferramenta....'
            };
            // when
            sinon_1.default.stub(sequelize_1.Model, 'create').resolves(outputMock);
            // action
            const response = yield chai_1.default.request(app.app).post('/post').send(inputMock); // req via metodo http POST, para a rota '/post' e enviar o 'req.body'
            // assertion
            (0, chai_1.expect)(response.body).to.be.deep.equal(outputMock);
        });
    });
    it('Metodo GET: Deve retornar o post correspondente ao ID informado', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const outputMock = {
                title: 'Typescript',
                content: 'Typescript agiliza a vida...'
            };
            sinon_1.default.stub(sequelize_1.Model, 'findByPk').resolves(outputMock);
            const response = yield chai_1.default.request(app.app).get('/post/1');
            (0, chai_1.expect)(response.status).to.be.equal(200);
            (0, chai_1.expect)(response.body).to.be.deep.equal(outputMock);
        });
    });
    it('Metodo GET: Deve retornar 404, quando o id não existir', function () {
        return __awaiter(this, void 0, void 0, function* () {
            sinon_1.default.stub(sequelize_1.Model, 'findByPk').resolves(null);
            const response = yield chai_1.default.request(app.app).get('/post/999'); // req via metodo http POST, para a rota '/post' e enviar o 'req.body'
            (0, chai_1.expect)(response.status).to.be.equal(404);
        });
    });
    it('Metodo GET: Deve retornar todos os posts cadastrados', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const outputMock = [{
                    id: 1,
                    title: 'Typescript',
                    content: 'Typescript agiliza a vida...'
                }];
            sinon_1.default.stub(sequelize_1.Model, 'findAll').resolves(outputMock);
            // action
            const response = yield chai_1.default.request(app.app).get('/post');
            (0, chai_1.expect)(response.status).to.be.equal(200);
            (0, chai_1.expect)(response.body).to.be.deep.equal(outputMock);
        });
    });
    it('Metodo PUT: Deve atualizar um post existente com sucesso e retornar o post atualizado', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const reqParamsMock = 1;
            const inputMock = { title: 'Node.js', content: 'Node.js veio para...' };
            const outputMock = { id: 1, title: 'Node.js', content: 'Node.js veio para...' };
            sinon_1.default.stub(sequelize_1.Model, 'update').resolves();
            sinon_1.default.stub(sequelize_1.Model, 'findByPk').resolves(outputMock);
            const response = yield chai_1.default.request(app.app).put(`/post/${reqParamsMock}`).send(inputMock);
            (0, chai_1.expect)(response.status).to.be.equal(200);
            (0, chai_1.expect)(response.body).to.be.deep.equal(outputMock);
        });
    });
    it('Metodo PUT: Deve retornar 404, quando o post não existir', function () {
        return __awaiter(this, void 0, void 0, function* () {
            sinon_1.default.stub(sequelize_1.Model, 'findByPk').resolves(null);
            const response = yield chai_1.default.request(app.app).get('/post/999'); // req via metodo http POST, para a rota '/post' e enviar o 'req.body'
            (0, chai_1.expect)(response.status).to.be.equal(404);
        });
    });
    it('Metodo DELETE: Deve excluir um post existe com sucesso', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const reqParamsMock = 1;
            sinon_1.default.stub(sequelize_1.Model, 'destroy').resolves();
            const response = yield chai_1.default.request(app.app).delete(`/post/${reqParamsMock}`);
            (0, chai_1.expect)(response.status).to.be.equal(200);
        });
    });
    it('Metodo DELETE: Deve retornar 404, quando o post não existir', function () {
        return __awaiter(this, void 0, void 0, function* () {
            sinon_1.default.stub(sequelize_1.Model, 'findByPk').resolves(null);
            const response = yield chai_1.default.request(app.app).get('/post/999'); // req via metodo http POST, para a rota '/post' e enviar o 'req.body'
            (0, chai_1.expect)(response.status).to.be.equal(404);
        });
    });
});
