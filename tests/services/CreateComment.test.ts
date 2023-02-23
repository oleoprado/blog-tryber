import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon"
import IComment from "../../src/api/interfaces/IComment";
import CommentService from "../../src/api/services/CommentService";
import Comment from '../../src/database/models/Comment';

describe('Testes de serviço: Create Comment', function() {
  afterEach(function() {
    Sinon.restore();
  });

  it('Deve criar um novo comentario', async function() {
    const inputMock: IComment = {
      content: 'que legal seu post, parabens',
      postId: 1,
    }
    const outputMock: Comment = new Comment({
      id: 1,
      content: 'que legal seu post, parabens',
      postId: 1,
    });

    Sinon.stub(Model, 'create').resolves(outputMock);

    const service = new CommentService();
    const result = await service.create(inputMock);

    expect(result).to.be.equal(outputMock);
  });

})