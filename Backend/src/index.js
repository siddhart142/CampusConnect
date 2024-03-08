import dotenv from "dotenv"
dotenv.config({
    path : './.env'
})
import app from "./app.js";

import connectDB from "./db/index.js";


console.log("env+ ",process.env.CORS_ORIGIN,process.env.EMAIL)

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