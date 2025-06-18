import express from "express"
import {addTodo, completedTask, deleteTodo, getAllTodos, updateTodo} from '../controllers/todos.controllers.js'
import { isAuthenticated } from "../middleware/IsAuthenticated.js"
import { RegenerateAccessTokenIfNeeded } from "../middleware/RegenerateAcessToken.js"

const router = express.Router()

router.use(RegenerateAccessTokenIfNeeded)
router.use(isAuthenticated)


router.route('/addTodo').post(addTodo)
router.route('/updateTodo/:todoId').put(updateTodo)
router.route('/getTodos').get(getAllTodos)
router.route('/deleteTodo/:todoId').delete(deleteTodo)
router.route('/updateTask/:todoId').get(completedTask)

export default router