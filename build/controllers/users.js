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
exports.Logout = exports.Login = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = void 0;
const user_db_1 = require("../databases/user.db");
const moment_1 = __importDefault(require("moment"));
const role_db_1 = require("../databases/role.db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_db_1.User.findAll({
            attributes: ['id', 'email', 'username', 'lastActive', 'createAt'],
            include: [
                {
                    model: role_db_1.Role,
                    as: "role"
                }
            ]
        });
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
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, username, password, roleId } = req.body;
    const timestamps = (0, moment_1.default)().format('llll');
    const ExistUser = yield user_db_1.User.findAll({
        where: {
            email: email,
        }
    });
    if (((_a = ExistUser[0]) === null || _a === void 0 ? void 0 : _a.username) === username) {
        return res.status(400).json({
            message: "Username telah tersedia"
        });
    }
    if (((_b = ExistUser[0]) === null || _b === void 0 ? void 0 : _b.email) === email) {
        return res.status(400).json({
            message: "Email telah tersedia"
        });
    }
    const salt = yield bcrypt_1.default.genSalt();
    const hashPassword = yield bcrypt_1.default.hash(password, salt);
    try {
        yield user_db_1.User.create({
            email: email,
            username: username,
            password: hashPassword,
            createAt: timestamps,
            roleId: roleId
        });
        res.status(200).json({
            message: 'success create new user'
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
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lastActive } = req.body;
    try {
        yield user_db_1.User.update({ lastActive: lastActive }, {
            where: {
                id: req.params.id
            }
        });
        res.sendStatus(200);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_db_1.User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.sendStatus(200);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.deleteUser = deleteUser;
// @ts-ignore
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield user_db_1.User.findAll({
            where: {
                email: req.body.email
            }
        });
        const matchPassword = yield bcrypt_1.default.compare(req.body.password, findUser[0].password);
        if (!matchPassword)
            return res.status(400).json({ message: "Password salah" });
        const userId = findUser[0].id;
        const email = findUser[0].email;
        const roleId = findUser[0].roleId;
        // @ts-ignore
        const accessToken = jsonwebtoken_1.default.sign({ userId, email, roleId }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        // @ts-ignore
        const refreshToken = jsonwebtoken_1.default.sign({ userId, email, roleId }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        yield user_db_1.User.update({ refreshToken: refreshToken }, {
            where: {
                id: userId
            }
        });
        // Set cookie from client
        res.json({ accessToken, refreshToken });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({
                message: "Email tidak terdaftar "
            });
        }
    }
});
exports.Login = Login;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken)
        return res.status(204);
    const Users = yield user_db_1.User.findAll({
        where: {
            refreshToken: refreshToken
        }
    });
    if (!Users[0])
        return res.sendStatus(204);
    const UserId = Users[0].id;
    yield user_db_1.User.update({ refreshToken: "" }, {
        where: {
            id: UserId
        }
    });
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
});
exports.Logout = Logout;
