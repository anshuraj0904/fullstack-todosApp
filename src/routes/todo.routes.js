import express from "express"
import {addTodo, completedTask, deleteTodo, getAllTodos, updateTodo} from '../controllers/todos.controllers.js'
import { isAuthenticated } from "../middleware/IsAuthenticated.js"

const router = express.Router()

router.route('/addTodo').post(isAuthenticated,addTodo)
router.route('/updateTodo/:todoId').put(isAuthenticated,updateTodo)
router.route('/getTodos').get(getAllTodos)
router.route('/deleteTodo/:todoId').delete(isAuthenticated,deleteTodo)
router.route('/updateTask/:todoId').get(isAuthenticated,completedTask)

export default router