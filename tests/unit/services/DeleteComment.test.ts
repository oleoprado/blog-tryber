import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon"
import CommentService from "../../../src/api/services/CommentService";
import Comment from "../../../src/database/models/Comment";

describe('Teste de serviço: Delete Comment', function () {
  afterEach(function () {
    Sinon.restore();
  });

  it('Verifica se um comment é deletado com sucesso', async function () {
    const reqParamsMock = 1;
    const outputMock = new Comment({ id: 1, content: 'Mocha ...', postId: 2 });

    Sinon.stub(Model, 'findByPk').resolves(outputMock);
    Sinon.stub(Model, 'destroy').resolves();
    const service = new CommentService();

    const result = await service.delete(reqParamsMock);
    expect(result).to.be.undefined;
  });
})