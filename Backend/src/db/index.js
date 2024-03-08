import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

// console.log(process.env.MONGODB_URL,process.env.EMAIL)
// console.log(`${process.env.MONGODB_URL}`)
const connectDB = async() =>{
    try{

        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        // console.log(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("\n MONGODB CONNECTED SUCCESSFULLY !!!!\n")

        // console.log(process.env.MONGODB_URL, process.env.EMAIL);
    }
    catch(error){
        console.log("MongoDB Connection Error ",error)
        process.exit(1);
    }
}

export default connectDB