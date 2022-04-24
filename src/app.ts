import express ,{ Express } from "express";
import morgan from "morgan";


import { dbAuthenticate } from "./configs/db.configs";
import { route } from "./routers/router";

const app:Express = express()
const PORT: string | number = process.env.PORT || 8080

function main():void {
    
    dbAuthenticate()

    app.use(express.json())
    app.use(morgan('dev'))
    app.use(route)
    app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))
}

main()