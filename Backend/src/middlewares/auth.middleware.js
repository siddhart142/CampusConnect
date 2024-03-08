import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const verifyJwt = asyncHandler(async (req,res,next)=>{

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new ApiError(401,"Unauthorized Access")
    }

    try{
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = User.findById(decodedToken._id).select("-password -refreshToekn")

        if(!user)
        {
            throw new ApiError(401,"Invalid Token")
        }

        req.user = user;
        next()
    }
    catch(error)
    {
        throw new ApiError(401,error?.message)
    }
})

export {verifyJwt}