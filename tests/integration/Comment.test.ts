import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from "sinon";
import IComment from "../../src/api/interfaces/IComment";
import Comment from "../../src/database/models/Comment";
import App from "../../src/App";
import { Model } from "sequelize";

chai.use(chaiHttp);

describe('Testes para a rota Comment', function() {
  const app = new App();

  afterEach(function() {
    Sinon.restore();
  });

  it('Metodo POST: Deve cadastrar um Comment com sucesso e retornar o comment criado', async function() {
    const inputMock: IComment = { content: 'Muito legal seu trabalho!', postId: 2 };
    const outputMock: Comment = { id: 1, content: 'Muito legal seu trabalho!', postId: 2 } as Comment;
    Sinon.stub(Model, 'create').resolves(outputMock);

    const response = await chai.request(app.app).post('/comment').send(inputMock);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo GET: Deve retornar todos os Comments com sucesso', async function() {
    const outputMock: Comment[] = [{ id: 1, content: 'Muito legal seu trabalho!', postId: 2 }] as Comment[];

    Sinon.stub(Model, 'findAll').resolves(outputMock);

    const result = await chai.request(app.app).get('/comment');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(outputMock);
  });

  it('Metodo GET: Deve retornar o Comment correspondente ao ID informado', async function() {
    const reqParamsMock = 1;
    const outputMock: Comment = { id: 1,content: 'Muito legal seu trabalho!',postId: 2 } as Comment;
    Sinon.stub(Model, 'findByPk').resolves(outputMock);

    const response = await chai.request(app.app).get(`/comment/${reqParamsMock}`);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo GET: Deve retornar 404, quando o id não existir', async function() {
    Sinon.stub(Model, 'findByPk').resolves(null);
    const response = await chai.request(app.app).get('/comment/420');
    expect(response.status).to.be.equal(404);
  });

  it('Metodo PUT: Deve atualizar um Comment existente com sucesso e retornar o Comment atualizado', async function() {
    const reqParamsMock = 1;
    const inputMock: IComment = { content: 'Caracas, que demais!', postId: 2 };
    const outputMock: Comment = { id: 1, content: 'Caracas, que demais', postId: 2 } as Comment;
    
    Sinon.stub(Model, 'update').resolves();
    Sinon.stub(Model, 'findByPk').resolves(outputMock);

    const response = await chai.request(app.app).put(`/comment/${reqParamsMock}`).send(inputMock);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo PUT: Deve retornar 404, quando o id não existir', async function() {
    Sinon.stub(Model, 'findByPk').resolves(null);
    const response = await chai.request(app.app).get('/comment/420');
    expect(response.status).to.be.equal(404);
  });

  it('Metodo DELETE: Deve excluir um Comment existente', async function() {
    const reqParamsMock = 1;
    const commentMock: Comment = { id: 1, content: 'Caracas, que demais', postId: 2 } as Comment;
    Sinon.stub(Model, 'findByPk').resolves(commentMock);
    Sinon.stub(Model, 'destroy').resolves();
    const response = await chai.request(app.app).delete(`/comment/${reqParamsMock}`);
    expect(response.status).to.be.equal(200);
  })
})