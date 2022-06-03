"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const db_configs_1 = require("../configs/db.configs");
const sequelize_1 = require("sequelize");
exports.Role = db_configs_1.blogDB.define('role', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});
exports.Role.sync({ alter: true });
