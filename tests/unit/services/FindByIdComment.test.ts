import Sinon from "sinon";
import Comment from "../../../src/database/models/Comment";
import { Model } from "sequelize";
import CommentService from "../../../src/api/services/CommentService";
import { expect } from "chai";

describe('Testes de serviço: FindById Comment', function () {
  afterEach(function () {
    Sinon.restore();
  });

  it('Verifica se retorna o comentario referente ao ID informado', async function () {
    const reqParamsMock = 1;
    const outputMock: Comment = new Comment({
      id: 1,
      content: 'que legal seu post, parabens',
      postId: 1,
    });

    Sinon.stub(Model, 'findOne').resolves(outputMock);
    const service = new CommentService();
    const result = await service.readById(reqParamsMock);
    expect(result).to.be.equal(outputMock);
  })
})