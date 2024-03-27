
import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"

import { registeruser,verifyOtp,loginUser,logoutUser, getCurrentUser, updateCover, updateAvatar, updateAccountDetails } from "../controllers/user.controller.js"
import { addEducation, getUserEducation } from "../controllers/education.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { addExperience, getUserExperience } from "../controllers/experience.controller.js"
import { addProject, getProject } from "../controllers/project.controller.js"
import { createPost, getPost } from "../controllers/post.controller.js"

const router = Router()

router.route("/register").post(registeruser)
router.route("/verify").post(verifyOtp)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt,logoutUser)
router.route("/getUserDetails").get(verifyJwt,getCurrentUser)

router.route("/Education").post(verifyJwt,addEducation)
router.route("/getUserEducation").get(verifyJwt,getUserEducation)

router.route("/Experience").post(verifyJwt,addExperience)
router.route("/getUserExperience").get(verifyJwt,getUserExperience)

router.route("/projects").post(verifyJwt,addProject)
router.route("/getUserProjects").get(verifyJwt,getProject)

router.route("/cover").post(
    upload.single("coverImage"),
    verifyJwt,
    updateCover
)

router.route("/avatar").post(
    upload.single("avatar"),
    verifyJwt,
    updateAvatar
)

router.route("/updatedata").post(verifyJwt,updateAccountDetails)

router.route("/post").post( upload.fields([
    {
        name: "images", // Field name for the avatar file
        maxCount: 10 // Maximum number of files allowed for the avatar
    },
]),verifyJwt,createPost)

router.route("/post").get(verifyJwt,getPost)

export default router