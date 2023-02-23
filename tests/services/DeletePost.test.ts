import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon"
import PostService from "../../src/api/services/PostService";
import Post from "../../src/database/models/Post";

describe('Teste de serviço: Delete Post', function() {
  afterEach(function() {
    Sinon.restore();
  });

  it('Verificar se um Post é deletado com sucesso', async function() {
    const reqParamsMock = 1;
    const outputMock: Post = new Post({
      id: 1,
      title: 'Jest com Typescript',
      content: 'Não aprendemos a testar codigo em Typescript utilizando Jest',
    });

    Sinon.stub(Model, 'findByPk').resolves(outputMock);
    Sinon.stub(Model, 'destroy').resolves();

    const service = new PostService();
    const result = await service.delete(reqParamsMock);
    
    expect(result).to.be.undefined;
  });

  it('Verifica se uma exceção é lançada ao passar um ID invalido', async function() {
    const reqParamsMock: number = 10;
    const errorMock: string = `Post with id ${reqParamsMock} not found`;
    const service = new PostService();

    try {
      await service.delete(reqParamsMock);
    } catch (error) {
      if (error instanceof Error)
      expect(error.message).to.equal(errorMock);
    }
  });
})