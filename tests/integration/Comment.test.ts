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
    const inputMock: IComment = {
      content: 'Muito legal seu trabalho!',
      postId: 2
    }
    const outputMock: Comment = {
      id: 1,
      content: 'Muito legal seu trabalho!',
      postId: 2
    } as Comment;
    Sinon.stub(Model, 'create').resolves(outputMock);

    const response = await chai.request(app.app).post('/comment').send(inputMock);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo GET: Deve retornar todos os Comments com sucesso', async function() {
    const outputMock: Comment[] = [{
      id: 1,
      content: 'Muito legal seu trabalho!',
      postId: 2
    }] as Comment[];

    Sinon.stub(Model, 'findAll').resolves(outputMock);

    const result = await chai.request(app.app).get('/comment');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(outputMock);
  });
  
})