import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon"
import IPost from "../../src/api/interfaces/IPost";
import PostService from "../../src/api/services/PostService";
import Post from "../../src/database/models/Post";

describe('Testes de serviço: Update Post', function () {
  afterEach(function () {
    Sinon.restore();
  });

  it('Deve atualizar um Post corretamente', async function () {
    const inputMock: IPost = {
      title: 'Jest com Typescript',
      content: 'Não aprendemos a testar codigo em Typescript utilizando Jest',
    }
    const outputMock: Post = new Post({
      id: 1,
      title: 'Jest com Typescript',
      content: 'Não aprendemos a testar codigo em Typescript utilizando Jest',
    });

    // Sinon.stub(Model, 'update').resolves();

    // const service = new PostService();
    // const result = await service.update(inputMock);

    // expect(result).to.be.equal(outputMock);
  })
})