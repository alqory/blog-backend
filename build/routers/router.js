"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const articles_1 = require("../controllers/articles");
const comment_1 = require("../controllers/comment");
const roles_1 = require("../controllers/roles");
const users_1 = require("../controllers/users");
const verify_1 = require("../middleware/verify");
const refreshToken_1 = require("../middleware/refreshToken");
const verifyComment_1 = require("../middleware/verifyComment");
exports.route = express_1.default.Router();
// Category
exports.route.get('/api/category', category_1.getCategory);
exports.route.get('/api/category-admin', verify_1.verifyToken, category_1.getCategoryAdmin);
exports.route.post('/api/category', verify_1.verifyToken, category_1.postCategory);
exports.route.put('/api/category/update/:id', verify_1.verifyToken, category_1.updateCategory);
exports.route.delete('/api/category/delete/:id', verify_1.verifyToken, category_1.deleteCategory);
// Article
exports.route.get('/api/article', articles_1.getArticle);
exports.route.get('/api/article/admin', verify_1.verifyToken, articles_1.getArticleAdmin);
exports.route.get('/api/article/:slug', articles_1.getSlugArticle);
exports.route.post('/api/article', verify_1.verifyToken, articles_1.postArticle);
exports.route.put('/api/article/update/:id', verify_1.verifyToken, articles_1.updateActicle);
exports.route.delete('/api/article/delete/:id', verify_1.verifyToken, articles_1.deleteArticle);
// Comment
exports.route.get('/api/comment', comment_1.getComment);
exports.route.post('/api/comment', verifyComment_1.verifyComment, comment_1.postComment);
exports.route.delete('/api/comment/delete/:id', comment_1.deleteCommentById);
// Role
exports.route.get('/api/role', roles_1.getRole);
exports.route.post('/api/role', roles_1.createRole);
// User
exports.route.get('/api/users', users_1.getUser);
exports.route.post('/api/register', users_1.createUser);
exports.route.put('/api/users/update/:id', users_1.updateUser);
exports.route.delete('/api/users/delete/:id', verify_1.verifyToken, users_1.deleteUser);
// Login
exports.route.post('/api/login', users_1.Login);
exports.route.delete('/api/logout', users_1.Logout);
// refresh Token
exports.route.get('/api/refresh-token', refreshToken_1.refreshToken);
