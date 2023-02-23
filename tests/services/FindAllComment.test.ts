import { expect } from "chai";
import Sinon from "sinon"
import CommentService from "../../src/api/services/CommentService";
import Comment from '../../src/database/models/Comment';

describe('Testes de serviço: FindAll Comment', function () {
  afterEach(function () {
    Sinon.restore();
  });

  it('Verifica se retorna todos os comentarios', async function () {
    const outputMock: Comment[] = [new Comment({
      id: 1,
      content: 'que legal seu post, parabens',
      postId: 1,
    })];

    Sinon.stub(Comment, 'findAll').resolves(outputMock);
    const service = new CommentService();
    const result = await service.readAll();

    expect(result).to.be.equal(outputMock);
    expect(result.length).to.be.equal(1);
  });
})