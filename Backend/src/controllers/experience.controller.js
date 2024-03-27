import { Experience } from "../models/experience.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";


const addExperience = asyncHandler(async(req,res)=>{

    const { title, employmentType, companyName, location, locationType, currentlyWorking, startMonth, startYear, endMonth, endYear, industry } = req.body;
    const owner = req.user._id

    const exp = await Experience.create({
        owner,
        title,
        employmentType,
        companyName,
        location,
        locationType,
        currentlyWorking,
        startMonth,
        startYear,
        endMonth,
        endYear,
        industry,
      })

    if(!exp){
        throw new ApiError(400,"Something went wrong while creating experience")
    }

   

   
    console.log("exp backend",exp)
    res.status(200)
    .json(
        new ApiResponse(200,exp,"Experience Added Successfully")
    )

})

const getUserExperience = asyncHandler(async(req,res)=>{

        console.log("exp",req.user._id)
 
        const exp = await Experience.find({ owner: req.user._id })
        // .then((documents) => {
        //     // 'documents' will be an empty array if the collection is empty
        //     console.log('Found documents:', documents);
        //     return documents
        //   })
        //   .catch((error) => {
        //     console.error('Error finding documents:', error);
        //   });

        // console.log("Education",education)
        // console.log(exp)
        if (!exp) {
        throw new ApiError(400, "Could not get User's Experience");
    }

    console.log("exp backend", exp);
    res.status(200)
        .json(
            new ApiResponse(200, exp, "Experience retrieved Successfully")
        );
})



export {
    addExperience,
    getUserExperience
}