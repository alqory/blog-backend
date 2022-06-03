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
exports.dbAuthenticate = exports.blogDB = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const define = process.env;
// Development
// export const blogDB = new Sequelize(`postgres://${define.DB_USERNAME}:${define.DB_PASSWORD}@${define.DB_HOST}:${define.DB_PORT}/${define.DB_NAME}`)
// 
exports.blogDB = new sequelize_1.Sequelize(`${define.DATABASE_URI}`, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
const dbAuthenticate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.blogDB.authenticate();
        console.log('Database connecting . . .');
    }
    catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        }
    }
});
exports.dbAuthenticate = dbAuthenticate;
