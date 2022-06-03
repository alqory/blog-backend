import express ,{ Express } from "express";
import morgan from "morgan";
import multer from 'multer'
import cors from 'cors'
import helmet from "helmet";
import cookieParser from 'cookie-parser'
import expressRateLimit from 'express-rate-limit'

import { dbAuthenticate } from "./configs/db.configs";
import { route } from "./routers/router";


const app:Express = express()
const PORT: string | number = process.env.PORT || 8080


const fileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'images')
    },
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req:Express.Request, file:Express.Multer.File, cb: multer.FileFilterCallback) => {
    if( file.mimetype === 'image/png'
     || file.mimetype === 'image/jpg' 
     || file.mimetype === 'image/jpeg'
      ){
        cb(null, true)
    }else{
        cb(null, false)
    }
}


function main():void {
    
    app.use(cookieParser())

    dbAuthenticate();

    app.use(express.json())

    // app.use(morgan('dev'))


    app.use(cors({
        origin : 'https://tricky.netlify.app',
        credentials : true,
    }))

    app.use(helmet({
        crossOriginResourcePolicy: false,
    }))

    app.use(expressRateLimit({
        windowMs : 10000,
        max : 10,
        message : "429"
    }))

    
    app.use(multer({
        storage : fileStorage,
        fileFilter : fileFilter
    }).single('images'))

    app.use('/images', express.static('images'))

    app.use(route)

    app.get('/limit', (req, res) => {
        res.json({
            message : "Hello"
        })
    })
    
    app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))
}



main();