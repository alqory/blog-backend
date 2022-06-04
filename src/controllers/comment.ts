import { Comments } from '../databases/comment.db'
import { Request, Response } from 'express'
import moment from 'moment'

type reqBody = {
    name : string
    text : string
    articleId : number
}

type reqParams = {
    id : number
}

type asyncFunc = (
    req: Request<reqParams, {}, reqBody, {
        api_key : string
    }>,
    res: Response
  ) => void;

export const getComment:asyncFunc = async ( req, res ) => {
    
        try {
            const data = await Comments.findAll()
            res.status(200).send(data)
    
        } catch (error) {
            if(error instanceof Error){
                res.json({
                    message : error.message
                })
            }
        }


}

export const postComment:asyncFunc = async ( req, res ) => {

    const { name, text, articleId } = req.body
    const timestamps:string = moment().format('llll')

    try {
        await Comments.create({
            name : name,
            text : text,
            postTime : timestamps,
            articleId : articleId
        })
        res.status(200).json({
            message: 'success create new comment!'
        })

    } catch (error) {
        if(error instanceof Error){
            res.json({
                message : error.message
            })
        }
    }
}

export const deleteCommentById:asyncFunc = async ( req, res ) => {
    try {
        await Comments.destroy({
            where : {
                id : req.params.id
            }
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