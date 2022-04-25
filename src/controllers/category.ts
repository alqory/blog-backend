import { Request, Response } from 'express'
import { Category } from "../databases/category.db";
import { Articles } from '../databases/articles.db'

type asyncFunc = ( 
    req:Request<{id : number},{},{name : string},{}>,
    res:Response
    ) => Promise<void>

export const getCategory:asyncFunc = async( req, res ) => {
    try {
        const data = await Category.findAll()

        res.status(200).send({
            message : 'oke',
            data    : data
        })

    } catch (error) {
        res.status(404).send({
            message : error,
            data    : []
        })
    }
}

export const postCategory:asyncFunc = async( req, res ) => {
    const { name } = req.body

    try {
        await Category.create({
            name : name
        })
        res.sendStatus(200)

    } catch (error) {
        res.json({
            message : error
        })
    }
}

export const updateCategory:asyncFunc = async ( req, res ) => {
    const { id } = req.params
    const { name }   = req.body
    try {

        await Category.update({ name : name }, {
            where: {
              id : id
            }
          });

          res.status(200).json({
              message : 'updated!'
          })

    } catch (error) {
        res.json({
            message : error
        })
    }
}

export const deleteCategory:asyncFunc = async ( req, res ) => {
    try {
        await Category.destroy({
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