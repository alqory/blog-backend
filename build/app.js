"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_configs_1 = require("./configs/db.configs");
const router_1 = require("./routers/router");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
function main() {
    (0, db_configs_1.dbAuthenticate)();
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)('dev'));
    app.use(router_1.route);
    app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
}
main();
