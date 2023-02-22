import {
  Model,
  INTEGER,
  STRING,
} from "sequelize";

import db from '.'

// FIXME: declarando os atributos que a tabela terá
class Post extends Model {
  declare readonly id: number; // somente leitura
  declare title: string;
  declare content: string;
}

// FIXME: iniciando a tabela com os campos definidos(migration)
Post.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  title: {
    allowNull: false,
    type: STRING,
  },
  content: {
    allowNull: false,
    type: STRING,
  }
}, { // options da model
  sequelize: db, // passar qual é o banco estamos trabalhando
  underscored: true, // setar toda coluna para snake case
  timestamps: false, // para não gerar os parametros de data automaticamente
  modelName: 'posts' // definir o nome da model com o mesmo nome definido na migration!
});

export default Post;