import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config();
const define = process.env

// Development
// export const blogDB = new Sequelize(`postgres://${define.DB_USERNAME}:${define.DB_PASSWORD}@${define.DB_HOST}:${define.DB_PORT}/${define.DB_NAME}`)

// 
export const blogDB = new Sequelize(`${define.DATABASE_URL}`,{
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