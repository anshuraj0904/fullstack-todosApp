import express from "express"
import {addTodo, getAllTodos, updateTodo} from '../controllers/todos.controllers.js'

const router = express.Router()

router.route('/addTodo').post(addTodo)
router.route('/updateTodo/:todoId').put(updateTodo)
router.route('/getTodos').get(getAllTodos)

export default router