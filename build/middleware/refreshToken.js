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
exports.refreshToken = void 0;
const user_db_1 = require("../databases/user.db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.sendStatus(401);
        const User = yield user_db_1.User.findAll({
            where: {
                refreshToken: refreshToken
            }
        });
        if (!User[0])
            return res.sendStatus(403);
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err)
                return res.sendStatus(403);
            const userId = User[0].id;
            const username = User[0].username;
            const email = User[0].email;
            const roleId = User[0].roleId;
            // @ts-ignore
            const refreshToken = jsonwebtoken_1.default.sign({ userId, username, email, roleId }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ refreshToken });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.refreshToken = refreshToken;
