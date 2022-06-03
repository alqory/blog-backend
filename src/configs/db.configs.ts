import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config();
const define = process.env

// export const blogDB = new Sequelize( 
//    process.env.NODE_ENV === 'production' ? `${process.env.DATABASE_URI}` : 
//    `postgres://${define.DB_USERNAME}:${define.DB_PASSWORD}@${define.DB_HOST}:${define.DB_PORT}/${define.DB_NAME}`
//  ,{
//      dialectOptions : {
//         ssl :  {
//                 require: true,
//                 rejectUnauthorized: false
//             }
//      }
//  })

export const blogDB = new Sequelize(`${process.env.DATABASE_URI}`,{
    dialectOptions : {
        ssl : {
            require: true,
            rejectUnauthorized : false
        }
    }
})

export const dbAuthenticate = async ():Promise<void> => {
    try {
        await blogDB.authenticate()
        console.log('Database connecting . . .');
        
    } catch (error) {
        if(error instanceof Error){
            throw Error(error.message)
        }
    }
}