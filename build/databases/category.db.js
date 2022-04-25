"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const db_configs_1 = require("../configs/db.configs");
exports.Category = db_configs_1.blogDB.define('category', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING({ length: 100 }),
        allowNull: false
    }
}, {
    timestamps: false
});
exports.Category.sync({ alter: true });
