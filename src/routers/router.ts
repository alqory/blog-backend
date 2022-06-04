import express, { Router } from 'express'
import { 
    getCategory,
    getCategoryAdmin,
    postCategory,
    updateCategory,
    deleteCategory
 } from '../controllers/category'

import { 
    getArticle,
    getArticleAdmin,
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

import {
    getRole, 
    createRole
} from '../controllers/roles'

import {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    Login,
    Logout
} from '../controllers/users'

import { verifyToken } from '../middleware/verify'
import { refreshToken } from '../middleware/refreshToken'
import { verifyComment } from '../middleware/verifyComment'
    
export const route:Router = express.Router()

// Category
route.get('/api/category', getCategory)
route.get('/api/category-admin', verifyToken , getCategoryAdmin)
route.post('/api/category', verifyToken, postCategory)
route.put('/api/category/update/:id', verifyToken,updateCategory)
route.delete('/api/category/delete/:id', verifyToken,deleteCategory)

// Article
route.get('/api/article', getArticle)
route.get('/api/article/admin', verifyToken ,getArticleAdmin)
route.get('/api/article/:slug', getSlugArticle)
route.post('/api/article', verifyToken ,postArticle)
route.put('/api/article/update/:id', verifyToken, updateActicle)
route.delete('/api/article/delete/:id', verifyToken, deleteArticle)

// Comment
route.get('/api/comment', getComment)
route.post('/api/comment', verifyComment ,postComment)
route.delete('/api/comment/delete/:id', deleteCommentById)

// Role
route.get('/api/role', getRole)
route.post('/api/role',createRole)

// User
route.get('/api/users', verifyToken, getUser)
route.post('/api/register', createUser)
route.put('/api/users/update/:id', updateUser)
route.delete('/api/users/delete/:id', verifyToken, deleteUser)

// Login
route.post('/api/login', Login)
route.delete('/api/logout', Logout)

// refresh Token
route.get('/api/refresh-token', refreshToken)