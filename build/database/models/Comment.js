"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Comment extends sequelize_1.Model {
}
Comment.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    content: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    postId: {
        allowNull: false,
        field: 'post_id',
        type: sequelize_1.INTEGER
    }
}, {
    sequelize: _1.default,
    underscored: true,
    timestamps: false,
    modelName: 'comments'
});
exports.default = Comment;
