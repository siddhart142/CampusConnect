import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const createPost = asyncHandler(async(req,res)=>{

    const {desc} = req.body

    const files = req.files;
    const images = files?.images;

    // console.log(desc)
    // console.log("Images:", images);

    const imageUrls = [];

    // Upload each image to Cloudinary
    for (const image of images) {
    const result = await uploadOnCloudinary(image.path);
    imageUrls.push(result.secure_url);
    }

    // console.log(imageUrls)
    const newPost = await Post.create({
        owner : req.user._id,
        desc,
        images : imageUrls
    })
    if(!newPost){
        throw new ApiError(400,"Error on Creating newPost")
    }
    res.status(200)
    .json(
        new ApiResponse(200,newPost,"Post Created Successfully")
    )
})

const getPost = asyncHandler(async(req,res)=>{
    const posts = await Post.find({owner : req.user._id})

    if(!posts){
        throw new ApiError(404,"No Post Found")
    }

    res.status(200).json(
        new ApiResponse(200,posts,"Posts Retrieved Successfully")
    )
})

export {createPost,
    getPost
        }