"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articles = void 0;
const sequelize_1 = require("sequelize");
const db_configs_1 = require("../configs/db.configs");
const category_db_1 = require("./category.db");
exports.Articles = db_configs_1.blogDB.define('article', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING({ length: 100 }),
        allowNull: false
    },
    body: {
        type: sequelize_1.DataTypes.TEXT,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING
    },
    createTime: {
        type: sequelize_1.DataTypes.STRING({ length: 20 }),
        allowNull: false
    }
}, {
    timestamps: false
});
category_db_1.Category.hasMany(exports.Articles, {
    foreignKey: 'categoryId',
    as: 'categoryId'
});
exports.Articles.belongsTo(category_db_1.Category);
exports.Articles.sync({ alter: true });
