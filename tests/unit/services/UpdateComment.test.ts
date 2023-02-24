import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon"
import IComment from '../../../src/api/interfaces/IComment';
import CommentService from "../../../src/api/services/CommentService";
import Comment from "../../../src/database/models/Comment";

describe('Teste de serviço: Update comment', function () {
  afterEach(function () {
    Sinon.restore();
  });

  it('Verifica se um comment é atualizado com sucesso', async function () {
    const reqParamsMock = 1;
    const inputMock: IComment = { content: 'foo', postId: 2 };
    const outputMock: Comment = new Comment({
      id: 1,
      content: 'foo',
      postId: 2
    });
    Sinon.stub(Model, 'update').resolves();
    Sinon.stub(Model, 'findByPk').resolves(outputMock);
    const service = new CommentService();

    await service.update(reqParamsMock, inputMock);
    const result = await service.readById(reqParamsMock);

    expect(result).to.be.equal(outputMock);
  });

  it('Verifica se uma exceção é lançada', async function () {
    const invalidReqParamMock = 420;
    const inputMock = { content: 'foo', postId: 1 };
    const errorMock = `Comment with id ${invalidReqParamMock} not found`;
    const service = new CommentService();

    try {
      await service.update(invalidReqParamMock, inputMock);
    } catch (error) {
      if (error instanceof Error)
        expect(error.message).to.be.equal(errorMock);
    }
  });
})