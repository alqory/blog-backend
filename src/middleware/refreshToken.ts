import { Request, Response } from 'express'
import { User as Users } from '../databases/user.db'
import jwt from 'jsonwebtoken'


export const refreshToken = async(req:Request, res:Response) => {
    try {
        const refreshToken = req.cookies.refreshToken
    
        
        if(!refreshToken) return res.sendStatus(401);

        const User:any = await Users.findAll({
            where : {
                refreshToken : refreshToken
            }
        })

        if(!User[0]) return res.sendStatus(403)

        

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err:any, decode:any) => {
            if(err) return res.sendStatus(403)

            const userId = User[0].id;
            const username = User[0].username;
            const email = User[0].email
            const roleId = User[0].roleId
            // @ts-ignore
            const refreshToken = jwt.sign({userId, username, email, roleId}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn : '15s'
            })

            res.json({ refreshToken })
        })

    } catch (error) {
        console.log(error);
        
    }
}