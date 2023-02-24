import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import IPost from "../../../src/api/interfaces/IPost";
import PostService from "../../../src/api/services/PostService";
import Post from "../../../src/database/models/Post";

describe('Testes de serviço: Create Post', function () {
  afterEach(function () {
    Sinon.restore();
  })

  it('Deve criar um novo Post', async function () {
    const inputMock: IPost = {
      title: 'Typescript na pratica',
      content: 'Typescript é uma boa ferramenta para ajudar no POO',
    }
    const outputMock: Post = new Post({
      id: 1,
      title: 'Typescript na pratica',
      content: 'Typescript é uma boa ferramenta para ajudar no POO',
    });

    Sinon.stub(Model, 'create').resolves(outputMock); // mockando o metodo create

    const service = new PostService();
    const result = await service.create(inputMock);

    expect(result).to.be.equal(outputMock);
  });
})