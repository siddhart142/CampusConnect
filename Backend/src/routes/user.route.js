
import {Router} from "express"

import { registeruser,verifyOtp,loginUser,logoutUser } from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registeruser)
router.route("/verify").post(verifyOtp)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt,logoutUser)
export default router