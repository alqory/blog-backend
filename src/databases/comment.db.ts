import { DataTypes } from "sequelize";
import { blogDB } from '../configs/db.configs'
import { Articles } from  '../databases/articles.db'

export const Comments = blogDB.define('comment', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    name : {
        type : DataTypes.STRING({ length:20 }),
        allowNull : false
    },
    text : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    postTime : {
        type : DataTypes.STRING({ length:30 }),
        allowNull : false

    }
},{
    timestamps : false
})

Articles.hasMany(Comments, {
    foreignKey : 'articleId',
    as : 'comment'
})
Comments.belongsTo(Articles)

// Comments.sync({ alter:true })