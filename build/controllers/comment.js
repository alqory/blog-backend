"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentById = exports.postComment = exports.getComment = void 0;
const comment_db_1 = require("../databases/comment.db");
const moment_1 = __importDefault(require("moment"));
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { api_key } = req.query;
    if (api_key !== process.env.API_KEY) {
        try {
            const data = yield comment_db_1.Comments.findAll();
            res.status(200).send(data);
        }
        catch (error) {
            if (error instanceof Error) {
                res.json({
                    message: error.message
                });
            }
        }
    }
    else {
        res.sendStatus(403);
    }
});
exports.getComment = getComment;
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, text, articleId } = req.body;
    const timestamps = (0, moment_1.default)().format('llll');
    try {
        yield comment_db_1.Comments.create({
            name: name,
            text: text,
            postTime: timestamps,
            articleId: articleId
        });
        res.status(200).json({
            message: 'success create new comment!'
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({
                message: error.message
            });
        }
    }
});
exports.postComment = postComment;
const deleteCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield comment_db_1.Comments.destroy({
            where: {
                id: req.params.id
            }
        });
        res.sendStatus(200);
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({
                message: error.message
            });
        }
    }
});
exports.deleteCommentById = deleteCommentById;
