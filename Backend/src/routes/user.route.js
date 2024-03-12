
import {Router} from "express"

import { registeruser,verifyOtp,loginUser,logoutUser, getCurrentUser } from "../controllers/user.controller.js"
import { addEducation, getUserEducation } from "../controllers/education.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registeruser)
router.route("/verify").post(verifyOtp)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt,logoutUser)
router.route("/getUserDetails").get(verifyJwt,getCurrentUser)
router.route("/Education").post(verifyJwt,addEducation)
router.route("/getUserEducation").get(verifyJwt,getUserEducation)
export default router