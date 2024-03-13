import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addProject = asyncHandler(async(req,res)=> {

    const {title, desc, startMonth,startYear,endMonth, endYear} = req.body 
    const owner = req.user._id
    console.log("owner of project",owner)

    const project = await Project.create({
        owner,
        title,
        desc,
        startMonth: startMonth ?? "",
        startYear: startYear ?? "",
        endMonth: endMonth ?? "",
        endYear: endYear ?? "",
    });

    if(!project){
        throw new ApiError(401,"Project cannot be created")
    }


    res.status(200)
    .json(
        new ApiResponse(200,project,"Project Created and User Updated")
    )
})

const getProject = asyncHandler(async(req,res)=>{

    
    const projects = await Project.find({ owner: req.user._id });

    if (!projects) {
        throw new ApiError(400, "Couldn't get User's Project");
    }

    console.log("backend project retrieve", projects);

    res.status(200).json(
        new ApiResponse(200, projects, "Project Retrieved Successfully")
    );
})

export {
    addProject,
    getProject
}