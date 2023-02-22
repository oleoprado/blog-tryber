import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import PostService from "../../src/api/services/PostService";
import Post from "../../src/database/models/Post";

describe('Testes de serviço: Ler todos Posts', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Deve ler uma lista com 1 Post', async function() {
    const outputMock: Post[] = [new Post({
      id: 1,
      title: 'Typescript na pratica',
      content: 'Typescript é uma boa ferramenta para ajudar no POO',
    })];

    Sinon.stub(Model, 'findAll').resolves(outputMock);
    const service = new PostService();
    const result = await service.readAll();

    expect(result).to.be.equal(outputMock);
    expect(result.length).to.be.equal(1);
  });
})