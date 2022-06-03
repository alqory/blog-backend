import { blogDB } from "../configs/db.configs";
import { DataTypes } from "sequelize";

export const Role = blogDB.define('role', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    timestamps : false
})

Role.sync({ alter:true })