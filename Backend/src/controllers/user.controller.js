
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import otpGenerator from 'otp-generator';
import { sendMail } from "../utils/Sendmail.js";
import { Verification } from "./verfication.model.js";

const grnerateAccessRefreshToken = async(userId) =>{
    try {
        // Finding the user by ID
        const user = await User.findById(userId);
        // console.log(user)
        // Generating a refresh token and an access token for the user
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();
        // console.log(refreshToken,accessToken)
        // Updating the user's refreshToken in the database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Returning the generated tokens
        return { accessToken, refreshToken };
    } catch (error) {
        // Handling errors during token generation
        throw new ApiError(500, "Something went wrong while generating Tokens");
    }
}
const registeruser = asyncHandler(async (req,res) => {

    // taking input data
    const {email, password, fullName} = req.body

    if([email, password, fullName].some((field)=> field?.trim() ===""))
    {
        throw new ApiError(400,"All Fields Are Required")
    }

    const existedUser = await User.findOne({email})

    if(existedUser){
        throw new ApiError(409,"User already exists")
    }

    const user = await User.create({
        email,
        password,
        fullName,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering")
    }
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    await Verification.create({
        owner : createdUser._id,
        otp : otp,

    })
    sendMail(email,otp)
    return res.status(200).json(new ApiResponse(200,createdUser,"Waiting for email Verfication"))

})

const verifyOtp = asyncHandler(async (req, res) => {
    // const { userId } = req.params;
    const {userId, otp } = req.body;
    console.log(userId)

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, 'User not found.');
    }

    if(user.verified){
        throw new ApiError(400,"User Already verified, please login")
    }

    const Otptoken = await Verification.findOne({owner : user._id})

    if(!Otptoken){
        throw new ApiError(401,"Otp Expired")
    }

    console.log(Otptoken)
    const isCorrect = await Otptoken.isOTPCorrect(otp);

    if(!isCorrect){
        throw new ApiError(401,"Entered OTP is Incorrect")
    }else
    {
        user.verified = true;
        await user.save({ validateBeforeSave: false });
        await Verification.deleteMany({owner:user._id})
    }

    res
    .status(200)
    .json(new ApiResponse(200, user, "User registered successfully"));
});

const loginUser = asyncHandler(async(req,res) => {

    const {email, password} = req.body;

    if(!email){
        throw new ApiError(400,"email required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isValidUser = await user.isPasswordCorrect(password)

    if(!isValidUser){
        throw new ApiError(401,"Inavlid User Credentials")
    }

    const {accessToken, refreshToken} = await grnerateAccessRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

     const options = {
        httpOnly: true,
        secure: true,
    };
    // console.log("before",loggedInUser)
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User Logged In Successfully")
        );
})

const logoutUser = asyncHandler(async(req,res)=> {

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
                }
            },
            {
                new: true
            }
        );
    
        console.log('Updated User:', updatedUser);
    } catch (error) {
        console.error('Update Error:', error);
    }
    
    // console.log("after",user)
    const options = {
        httpOnly: true,
        secure: true,
    };

    // Returning a successful response with cleared cookies
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User Logged Out")
        );
})
export {registeruser,verifyOtp,loginUser,logoutUser}