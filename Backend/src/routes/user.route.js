
import {Router} from "express"

import { registeruser,verifyOtp,loginUser,logoutUser, getCurrentUser } from "../controllers/user.controller.js"
import { addEducation, getUserEducation } from "../controllers/education.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { addExperience, getUserExperience } from "../controllers/experience.controller.js"
import { addProject, getProject } from "../controllers/project.controller.js"

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

export default router