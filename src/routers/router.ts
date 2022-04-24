import express, { Router } from 'express'
import { 
    getCategory,
    postCategory,
    updateCategory
 } from '../controllers/category'

import { getArticle, postArticle } from '../controllers/articles'

export const route:Router = express.Router()

route.get('/api/category', getCategory)
route.post('/api/category', postCategory)
route.put('/api/category/:id', updateCategory)

route.get('/api/article', getArticle)
route.post('/api/article', postArticle)

