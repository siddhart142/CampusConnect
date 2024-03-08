import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

console.log(process.env.CORS_ORIGIN)

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRoutes from "./routes/user.route.js"

app.use("/api/v1/users",userRoutes)

export default app