
import { Education } from "../models/education.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addEducation = asyncHandler(async(req,res) => {

    try {
        const {institute, degree, fieldOfStudy, startMonth, startYear, endMonth, endYear } = req.body;
        const owner = req.user?._id

        if(!owner){
            throw new ApiError(401,"Unauthorized Access")
        }
    
        const newEducation = await Education.create({
            owner,
            institute,
            degree,
            fieldOfStudy,
            startMonth,
            startYear,
            endMonth,
            endYear
        })
    
        if(!newEducation){
            throw new ApiError(400,"Something went wrong while creating education")
        }
    
        const user = await User.findByIdAndUpdate(
            owner,
            {
                $push : { education: newEducation._id},
            },{
                new : true
            }
        )
    
        if(!user){
            throw new ApiError(404,"User Cannot be found to add Education")
        }
    
        res.status(200)
        .json(
            new ApiResponse(200,newEducation,"Education Added Successfully")
        )
    } catch (error) {
        console.log(error.message)
        throw new ApiError(400,error.message)
    }
})

const getUserEducation = asyncHandler(async(req,res)=>{

    try {
        const education = await Education.find({ owner: req.user._id });

        // console.log("Education",education)
        if(!education){
            throw new ApiError(400,"Couldnt get User's Education")
        }
        res.status(200)
        .json(
            new ApiResponse(200,education,"Education retrived Successfully")
        )
    } catch (error) {
        throw new ApiError(400,"Failed to retrieve Education data")
        
    }
})

export {addEducation, getUserEducation}