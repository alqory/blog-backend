"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const sequelize_1 = require("sequelize");
const db_configs_1 = require("../configs/db.configs");
const articles_db_1 = require("../databases/articles.db");
exports.Comments = db_configs_1.blogDB.define('comment', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING({ length: 20 }),
        allowNull: false
    },
    text: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    postTime: {
        type: sequelize_1.DataTypes.STRING({ length: 30 }),
        allowNull: false
    }
}, {
    timestamps: false
});
articles_db_1.Articles.hasMany(exports.Comments, {
    foreignKey: 'articleId',
    as: 'comment'
});
exports.Comments.belongsTo(articles_db_1.Articles);
// Comments.sync({ alter:true })
