"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = __importDefault(require("../controllers/PostController"));
const PostService_1 = __importDefault(require("../services/PostService"));
const postRoutes = (0, express_1.Router)();
const postService = new PostService_1.default();
const postController = new PostController_1.default(postService);
postRoutes
    .post('/post', (req, res) => postController.create(req, res))
    .get('/post', (req, res) => postController.readByAll(req, res))
    .get('/post/:id', (req, res) => postController.readById(req, res))
    .put('/post/:id', (req, res) => postController.update(req, res))
    .delete('/post/:id', (req, res) => postController.delete(req, res));
exports.default = postRoutes;
