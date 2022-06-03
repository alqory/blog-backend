import { Role } from "../databases/role.db";
import { Request, Response } from "express";

type reqBody = {
    name : string
}


type asyncFunc =
 ( req:Request<{},{},reqBody,{}>, res:Response) => Promise<void>

export const getRole:asyncFunc = async (req, res) => {
    try {
        const data = await Role.findAll()
        res.status(200).send(data)

    } catch (error) {
        if(error instanceof Error){
            res.json({
                message : error.message
            })
        }
    }
}

export const createRole:asyncFunc = async (req, res) => {
    const { name } = req.body
    try {
        await Role.create({
            name : name
        })
        res.sendStatus(200)
        
    } catch (error) {
        if(error instanceof Error){
            res.json({
                message : error.message
            })
        }
    }
}