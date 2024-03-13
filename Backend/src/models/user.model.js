import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";

const UserSchema = new Schema({

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true // to trim preceding and succiding white spaces
    },
    password : {
        type : String,
        required : [true, "Password is required"],
    },
    fullName :{
        type : String,
        required : true,
        index : true,
        trim : true,
    },
    location : {
        type : String,
    },
    avatar : {
        type : String,
    },
    coverImage : {
        type : String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    description : {
        type : String
    },
    refreshToken : {
        type : String,
    }
},{timestamps : true});


UserSchema.pre("save", async function(next) {

    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function () {

    try{
        return jwt.sign(
            {
                _id : this._id,
                email : this.email,
                fullName : this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }catch(error){
        throw new ApiError(500,"Error while generating accessToken")
    }
}
UserSchema.methods.generateRefreshToken = function () {

    try{
        return jwt.sign(
            {
                _id : this._id,
                
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn : process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }catch(error){
        throw new ApiError(500,"Error while generating refreshToken")
    }
}


export const User = mongoose.model("User",UserSchema)