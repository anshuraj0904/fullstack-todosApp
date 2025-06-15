import express from "express"
import { login, logout, register } from "../controllers/user.controllers.js"
import { isAlreadyLogged } from "../middleware/AlreadyLoggedIn.js"

const router = express.Router()


router.route("/register").post(register)

router.route("/login").post(isAlreadyLogged,login)
router.route("/logout").get(logout)

export default router