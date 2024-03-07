import dotenv from "dotenv"

import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path : './.env'
})
// console.log("env+ ",process.env.CORS_ORIGIN)

connectDB()
.then(()=>{


    app.listen(process.env.PORT,()=>{
        console.log(`\nServer is listening at port ${process.env.PORT}`)
    })
})
.catch((error)=>
{
    console.log("\nMONGODB CONNECTION FAILED!!!",error)
})