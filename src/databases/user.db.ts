import { blogDB } from "../configs/db.configs";
import { DataTypes } from "sequelize/types";

export const User = blogDB.define('user', {
    id : {
        type : DataTypes.UUID,
        primaryKey : true,
        autoIncrement : true
    },
    firstname : {
        type : DataTypes.STRING({ length:20 }),
        allowNull: false
    },
    lastname : {
        type : DataTypes.STRING({ length:20 }),
        allowNull: true
    },
    password : {
        type : DataTypes.STRING({ length:30 }),
        allowNull: false
    }
})

User.sync({ alter:true })