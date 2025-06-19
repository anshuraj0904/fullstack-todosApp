import express from "express"
import { refresh } from "../controllers/refToken.controllers.js"

const router = express.Router()

router.route('/refresh').get(refresh)


export default router 