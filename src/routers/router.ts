import express, { Router } from 'express'
import { 
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory
 } from '../controllers/category'

import { 
    getArticle,
    getSlugArticle,
    postArticle, 
    updateActicle,
    deleteArticle
 } from '../controllers/articles'

import {
    getComment,
    postComment,
    deleteCommentById
} from '../controllers/comment'

    
export const route:Router = express.Router()

route.get('/api/category', getCategory)
route.post('/api/category', postCategory)
route.put('/api/category/update/:id', updateCategory)
route.delete('/api/category/delete/:id', deleteCategory)

route.get('/api/article', getArticle)
route.get('/api/article/:slug', getSlugArticle)
route.post('/api/article', postArticle)
route.put('/api/article/update/:id', updateActicle)
route.delete('/api/article/delete/:id', deleteArticle)

route.get('/api/comment', getComment)
route.post('/api/comment', postComment)
route.delete('/api/comment/delete/:id', deleteCommentById)