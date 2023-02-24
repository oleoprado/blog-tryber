import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Model } from 'sequelize';
import Sinon from 'sinon';
import IPost from '../../src/api/interfaces/IPost';
import App from '../../src/App';
import Post from '../../src/database/models/Post';

chai.use(chaiHttp); //p/ simular requisições Http

describe('Testes para rota Post', function() {
  const app = new App(); // instanciar o app p/ simular a requisição

  afterEach(function() {
    Sinon.restore();
  });
  
  it('Deve cadastrar um Post com sucesso', async function() {
    // arrange
    const post = {
      title: 'Post teste',
      content: 'Meu primeiro post'
    }

    // action
    const response = await chai.request(app.app).post('/post').send(post); // req via metodo http POST, para a rota '/post' e enviar o post

    // assertion
    expect(response.status).to.be.equal(201);
  });

  it('Deve cadastrar um Post com sucesso e retornar o objeto criado', async function() {
    // arrange
    const inputMock: IPost = {
      title: 'Typescript',
      content: 'Typescript é uma boa ferramenta....'
    } 
    const outputMock: Post = {
      id: 1,
      title: 'Typescript',
      content: 'Typescript é uma boa ferramenta....'
    } as Post;

    // when
    Sinon.stub(Model, 'create').resolves(outputMock);

    // action
    const response = await chai.request(app.app).post('/post').send(inputMock); // req via metodo http POST, para a rota '/post' e enviar o 'body'

    // assertion
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Deve retornar o post correspondente ao ID informado', async function() {
    const outputMock = {
      title: 'Typescript',
      content: 'Typescript agiliza a vida...'
    } as Post;

    Sinon.stub(Model, 'findByPk').resolves(outputMock);
    const response = await chai.request(app.app).get('/post/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Deve retornar 404, quando o id não existir', async function() {
    Sinon.stub(Model, 'findByPk').resolves(null);
    const response = await chai.request(app.app).get('/post/1'); // req via metodo http POST, para a rota '/post' e enviar o 'body'
    expect(response.status).to.be.equal(404);
  })
})