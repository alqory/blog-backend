"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import morgan from "morgan";
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const db_configs_1 = require("./configs/db.configs");
const router_1 = require("./routers/router");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
function main() {
    app.use((0, cookie_parser_1.default)());
    (0, db_configs_1.dbAuthenticate)();
    app.use(express_1.default.json());
    // app.use(morgan('dev'))
    const Origin = ["https://tricky.netlify.app", "http://localhost:3000"];
    app.use((0, cors_1.default)({
        origin: Origin[0],
        credentials: true
    }));
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: false,
    }));
    app.use((0, express_rate_limit_1.default)({
        windowMs: 10000,
        max: 10,
        message: "429"
    }));
    app.use((0, multer_1.default)({
        storage: fileStorage,
        fileFilter: fileFilter
    }).single('images'));
    app.use('/images', express_1.default.static('images'));
    app.use(router_1.route);
    app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
}
main();
