import { assert, expect } from "chai";
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
    const reqParamsMock: number = 1;
    const inputMock: IPost = {
      title: 'Jest com Typescript',
      content: 'Não aprendemos a testar codigo em Typescript utilizando Jest',
    }
    const outputMock: Post = new Post({
      id: 1,
      title: 'Jest com Typescript',
      content: 'Não aprendemos a testar codigo em Typescript utilizando Jest',
    });

    Sinon.stub(Model, 'update').resolves();
    Sinon.stub(Model, 'findByPk').resolves(outputMock);

    const service = new PostService();
    await service.update(reqParamsMock, inputMock);

    const result = await service.readById(reqParamsMock);

    expect(result).to.be.equal(outputMock);
  });

  it('Deve retornar uma exceção caso não encontre o POST com o ID informado', async function () {
    const reqParamsMock: number = 10;
    const inputMock: IPost = { title: 'Jest', content: 'Não aprendemos ...' };
    const errorMock: string = `Post with id ${reqParamsMock} not found`;
    const service = new PostService();
  
    try {
      await service.update(reqParamsMock, inputMock);
    } catch (error) {
      if (error instanceof Error)
      expect(error.message).to.equal(errorMock)
    }
  })
})