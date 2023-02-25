"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = __importDefault(require("../controllers/CommentController"));
const CommentService_1 = __importDefault(require("../services/CommentService"));
const commentRoutes = (0, express_1.Router)();
const commentService = new CommentService_1.default();
const commentController = new CommentController_1.default(commentService);
commentRoutes
    .post('/comment', (req, res) => commentController.create(req, res))
    .get('/comment', (req, res) => commentController.readAll(req, res))
    .get('/comment/:id', (req, res) => commentController.readById(req, res))
    .put('/comment/:id', (req, res) => commentController.update(req, res))
    .delete('/comment/:id', (req, res) => commentController.delete(req, res));
exports.default = commentRoutes;
