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
exports.updateActicle = exports.postArticle = exports.getSlugArticle = exports.getArticle = void 0;
const articles_db_1 = require("../databases/articles.db");
const category_db_1 = require("../databases/category.db");
const slug_1 = __importDefault(require("slug"));
const moment_1 = __importDefault(require("moment"));
const comment_db_1 = require("../databases/comment.db");
const getArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, page } = req.query;
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    try {
        if (category && page) {
            const data = yield articles_db_1.Articles.findAll({
                attributes: ["id", "title", "body", "slug", "createTime"],
                include: [
                    {
                        model: category_db_1.Category,
                        as: "category",
                        where: {
                            'name': category
                        }
                    },
                    {
                        model: comment_db_1.Comments,
                        attributes: ["name", "text", "postTime"],
                        as: 'comment'
                    }
                ]
            });
            const result = data.slice(startIndex, endIndex);
            res.status(200).send(result);
        }
        else {
            const data = yield articles_db_1.Articles.findAll({
                attributes: ["id", "title", "body", "slug", "createTime"],
                include: [
                    {
                        model: category_db_1.Category,
                        as: "category",
                    },
                    {
                        model: comment_db_1.Comments,
                        attributes: ["name", "text", "postTime"],
                        as: 'comment'
                    }
                ],
            });
            const result = data.slice(startIndex, endIndex);
            res.status(200).send(result);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({
                message: error.message,
            });
        }
    }
});
exports.getArticle = getArticle;
const getSlugArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const data = yield articles_db_1.Articles.findAll({
            attributes: ["id", "title", "body", "slug", "createTime"],
            include: [
                {
                    model: category_db_1.Category,
                    as: "category",
                }
            ],
            where: {
                slug: slug,
            },
        });
        res.status(200).send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({
                message: error.message,
            });
        }
    }
});
exports.getSlugArticle = getSlugArticle;
const postArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, categoryId } = req.body;
    const slugify = (0, slug_1.default)(title);
    const timestamps = (0, moment_1.default)().format("ll");
    try {
        yield articles_db_1.Articles.create({
            title: title,
            body: body,
            slug: slugify,
            createTime: timestamps,
            categoryId: categoryId,
        });
        res.status(200).json({
            message: "success create new post!",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({
                message: error.message,
            });
        }
    }
});
exports.postArticle = postArticle;
const updateActicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, body } = req.body;
    const slugify = (0, slug_1.default)(title);
    try {
        yield articles_db_1.Articles.update({
            title: title,
            body: body,
            slug: slugify
        }, {
            where: { id: id }
        });
        res.status(200).json({
            message: 'Update!'
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({
                message: error.message,
            });
        }
    }
});
exports.updateActicle = updateActicle;
