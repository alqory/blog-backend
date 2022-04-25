import { blogDB } from "../configs/db.configs";
import { User } from "./user.db";
import { DataTypes } from "sequelize/types";

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

Role.hasMany(User, {
    foreignKey : "userId",
    as : "role"
})

Role.sync({ alter:true })