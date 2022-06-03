import { DataTypes } from 'sequelize'
import { blogDB } from '../configs/db.configs'
import { Category } from './category.db'

export const Articles = blogDB.define('article', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING({ length : 100 }),
        allowNull : false
    },
    title2 : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    source : {
        type : DataTypes.TEXT,
        allowNull : true
    },
    content : {
        type : DataTypes.TEXT,
    },
    images : {
        type : DataTypes.STRING
    },
    slug : {
        type : DataTypes.STRING
    },
    createTime : {
        type : DataTypes.STRING({ length: 20 }),
        allowNull : false
    }
},{
    timestamps : false
})

Category.hasMany(Articles, {
    foreignKey  : 'categoryId',
    as : 'categoryId'
})

Articles.belongsTo(Category)
Articles.sync({ alter : true })
