import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const verifyJwt = asyncHandler(async (req,res,next)=>{

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

    console.log(token)

    if(!token){
        throw new ApiError(401,"Unauthorized Access")
    }

    try{
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        console.log("decode",decodedToken)

        const user = await User.findById(decodedToken._id)
        // const user2 = await User.findById(decodedToken._id);

        // console.log("user1\n",user1)
        console.log("\n\nuser2\n\n",user)

        if(!user)
        {
            throw new ApiError(401,"Invalid Token")
        }

        // console.log(user)
        req.user = user;
        next()
    }
    catch(error)
    {
        throw new ApiError(401,error?.message)
    }
})

export {verifyJwt}