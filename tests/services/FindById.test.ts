import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import PostService from "../../src/api/services/PostService";
import Post from "../../src/database/models/Post";

describe('Teste de serviço: FindById Post', function() {
  afterEach(function() {
    Sinon.restore();
  });

  it('Deve retornar o Post referente ao id informado', async function () {
    const inputMock = 1;
    const outputMock: Post = new Post({
      id: 1,
      title: 'Typescript na pratica',
      content: 'Typescript é uma boa ferramenta para ajudar no POO',
    });

    Sinon.stub(Model, 'findByPk').resolves(outputMock);

    const service = new PostService();
    const result = await service.readById(inputMock);

    expect(result).to.be.equal(outputMock);
  })
})