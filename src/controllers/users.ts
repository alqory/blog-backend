import { User } from "../databases/user.db";
import { Request, Response } from "express";
import { Model } from 'sequelize'
import moment from 'moment'
import { Role } from "../databases/role.db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type reqBody = {
    email? : string
    username? : string
    password : string
    lastActive? : string;
    roleId?  : number
}

type reqParams = {
    id : number
}

type asyncFunc =
 ( req:Request<reqParams,{},reqBody,{}>, res:Response) => Promise<void>

export const getUser:asyncFunc = async(req, res) => {
    try {
        const data = await User.findAll({
            attributes : ['id','email','username','lastActive','createAt'],
            include : [
                {
                    model : Role,
                    as : "role"
                }
            ]
        })
        res.status(200).send(data)

    } catch (error) {
         if(error instanceof Error){
            res.json({
                message : error.message
            })
        }
    }
}

export const createUser:asyncFunc = async (req, res):Promise<string | any>  => {

    const { email, username, password, roleId } = req.body


    const timestamps:string = moment().format('llll')

    const ExistUser:any = await User.findAll({
        where : {
            email : email,
        }
    })

    
    if(ExistUser[0]?.username === username ) {
        return res.status(400).json({
            message : "Username telah tersedia"
        })
    }

    if(ExistUser[0]?.email === email ) {
        return res.status(400).json({
            message : "Email telah tersedia"
        })
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt) 

    try {
        await User.create({
            email : email,
            username : username,
            password : hashPassword,
            createAt : timestamps,
            roleId : roleId
        })
        res.status(200).json({
            message: 'success create new user'
        })

    } catch (error) {
        if(error instanceof Error){
            res.json({
                message : error.message
            })
        }
    }
}

export const updateUser:asyncFunc = async(req, res) => {
    const { lastActive } = req.body;
    try {
        await User.update({ lastActive : lastActive }, {
            where : {
                id : req.params.id
            }
        })

        res.sendStatus(200)

    } catch (error) {
        res.status(400).json({ error })
    }
}

export const deleteUser:asyncFunc = async(req, res) => {
    try {
        await User.destroy({
            where : {
                id : req.params.id
            }
        })
        res.sendStatus(200)

    } catch (error) {
        res.status(400).json({ error })
    }
}

// @ts-ignore
export const Login = async ( req:Request, res:Response ) => {


    try {
        const findUser:any = await User.findAll({
            where : {
                email : req.body.email
            }
        })


        const matchPassword = await bcrypt.compare(req.body.password, findUser[0].password)
        
        if(!matchPassword) return res.status(400).json({ message : "Password salah" })

        const userId = findUser[0].id; 
        const email = findUser[0].email;
        const roleId = findUser[0].roleId
        // @ts-ignore
        const accessToken = jwt.sign({ userId, email, roleId }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : '15s'
        })
        
        // @ts-ignore
        const refreshToken = jwt.sign({ userId, email, roleId }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn : '1d'
        })

        

        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            secure : true,
            maxAge : 24 * 60 * 60 * 1000
        })

        await User.update({ refreshToken : refreshToken }, {
            where : {
                id : userId
            }
        })

        // Set cookie from client
        res.json({ accessToken, refreshToken })

    } catch (error) {
        if(error instanceof Error){
            res.status(404).json({
                message : "Email tidak terdaftar "
            })
        }
    }
} 

export const Logout = async (req:Request, res:Response) => {
    const refreshToken = req.cookies.refreshToken
    console.log(refreshToken);
    

        if(!refreshToken) return res.status(204)

        const Users:any = await User.findAll({
            where : {
                refreshToken : refreshToken
            }
        })

        if(!Users[0]) return res.sendStatus(204)
        
        const UserId = Users[0].id;

        await User.update({ refreshToken : "" }, {
            where : {
                id : UserId
            }
        })

        res.clearCookie("refreshToken")

        return res.sendStatus(200)
}