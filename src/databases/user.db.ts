import { blogDB } from "../configs/db.configs";
import { Role } from "./role.db";
import { DataTypes } from "sequelize";

export const User = blogDB.define('user', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email : {
        type : DataTypes.STRING({ length:50 }),
        allowNull: false
    },
    username : {
        type : DataTypes.STRING({ length:20 }),
    },
    password : {
        type : DataTypes.TEXT,
        allowNull: false
    },
    refreshToken : {
        type : DataTypes.TEXT
    },
    lastActive : {
        type : DataTypes.TEXT,
        allowNull : true
    },
    createAt : {
        type : DataTypes.TEXT,
        allowNull : false
    }
}, {
    timestamps : false
})

Role.hasMany(User, {
    foreignKey : "roleId",
    as : 'role'
})

User.belongsTo(Role)

// User.sync({ alter:true })