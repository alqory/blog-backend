"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeadres = req.headers["authorization"];
    const token = authHeadres === null || authHeadres === void 0 ? void 0 : authHeadres.split(" ")[1];
    if (token === null)
        return res.sendStatus(401);
    //@ts-ignore    
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        // @ts-ignore
        if (err || decode.roleId !== 1)
            return res.sendStatus(403);
        next();
    });
};
exports.verifyToken = verifyToken;
