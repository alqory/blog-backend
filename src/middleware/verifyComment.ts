import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

type middlewareFunc = ( 
    req:Request<{},{},{},{}>,
    res:Response,
    next:NextFunction
 ) => void

export const verifyComment:middlewareFunc = ( req, res, next ) => {
   const authHeadres = req.headers["authorization"]
   const token      = authHeadres?.split(" ")[1]
   if(token === null) return res.sendStatus(401);

   //@ts-ignore    
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        next()
   })
}
