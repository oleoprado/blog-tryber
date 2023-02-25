"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
// FIXME: declarando os atributos que a tabela terá
class Post extends sequelize_1.Model {
}
// FIXME: iniciando a tabela com os campos definidos(migration)
Post.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER
    },
    title: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    content: {
        allowNull: false,
        type: sequelize_1.STRING,
    }
}, {
    sequelize: _1.default,
    underscored: true,
    timestamps: false,
    modelName: 'posts' // definir o nome da model com o mesmo nome definido na migration!
});
exports.default = Post;
