import { Request, Response } from 'express'
import { Articles } from '../databases/articles.db';
import { Category } from '../databases/category.db';
import slug from 'slug'
import moment from 'moment'

type reqBody = {
    title: string
    body : string
    categoryId : number
}
type asyncFunc = (req:Request<{},{},reqBody,{}>, res:Response) => Promise<void>

export const getArticle:asyncFunc = async( req, res ) => {
    try {
        const data = await Articles.findAll({
            attributes : ['id', 'title', 'body', 'slug', 'createTime'],
            include : [{
                model : Category,
                as : 'category'
            }]
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

export const postArticle:asyncFunc = async( req, res ) => {

    const { title, body, categoryId } = req.body
    const slugify: string = slug(title)
    const timestamps: string = moment().format('ll')

    try {
        await Articles.create({
            title : title,
            body : body,
            slug : slugify,
            createTime : timestamps,
            categoryId : categoryId
        })
        res.status(200).json({
            message : 'success create new post!'
        })

    } catch (error) {
        if(error instanceof Error){
            res.json({
                message : error.message
            })
        }
    }
}