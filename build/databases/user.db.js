"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_configs_1 = require("../configs/db.configs");
const role_db_1 = require("./role.db");
const sequelize_1 = require("sequelize");
exports.User = db_configs_1.blogDB.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING({ length: 50 }),
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING({ length: 20 }),
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    refreshToken: {
        type: sequelize_1.DataTypes.TEXT
    },
    lastActive: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    createAt: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});
role_db_1.Role.hasMany(exports.User, {
    foreignKey: "roleId",
    as: 'role'
});
exports.User.belongsTo(role_db_1.Role);
// User.sync({ alter:true })
