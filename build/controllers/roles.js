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
exports.createRole = exports.getRole = void 0;
const role_db_1 = require("../databases/role.db");
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield role_db_1.Role.findAll();
        res.status(200).send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({
                message: error.message
            });
        }
    }
});
exports.getRole = getRole;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        yield role_db_1.Role.create({
            name: name
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
exports.createRole = createRole;
