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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.postCategory = exports.getCategory = exports.getCategoryAdmin = void 0;
const category_db_1 = require("../databases/category.db");
const getCategoryAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield category_db_1.Category.findAll();
        res.status(200).send(data);
    }
    catch (error) {
        res.status(404).send({
            message: error,
            data: []
        });
    }
});
exports.getCategoryAdmin = getCategoryAdmin;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield category_db_1.Category.findAll();
        res.status(200).send(data);
    }
    catch (error) {
        res.status(404).send({
            message: error,
            data: []
        });
    }
});
exports.getCategory = getCategory;
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        yield category_db_1.Category.create({
            name: name
        });
        res.sendStatus(200);
    }
    catch (error) {
        res.json({
            message: error
        });
    }
});
exports.postCategory = postCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        yield category_db_1.Category.update({ name: name }, {
            where: {
                id: id
            }
        });
        res.status(200).json({
            message: 'updated!'
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield category_db_1.Category.destroy({
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
exports.deleteCategory = deleteCategory;
