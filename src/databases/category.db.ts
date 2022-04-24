import { DataTypes } from 'sequelize'
import { blogDB } from '../configs/db.configs'
import { Articles } from './articles.db'

export const Category = blogDB.define('category', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING({ length : 100 }),
        allowNull : false
    }
},{
    timestamps : false
})


Category.sync({ alter : true })
