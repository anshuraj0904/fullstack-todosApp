import {Todo} from '../models/todos.models.js'
import mongoose from 'mongoose'

export const addTodo = async(req, res)=>{
    try {
        const {title, description} = req.body
        if(!title || !description)
        {
            return res.status(404).json({
                success:false,
                messsage:"Either of title or description is missing!"
            })
        }
    
        const todo = await Todo.findOne({title})
    
        if(todo){
            return res.status(409).json({
                success:false,
                message:"A todo task with this title already exists!"
            })
        }
    
        await Todo.create({
            title,
            description,
            isCompleted:false
        })
    
        return res.status(201).json({
            success:true,
            messsage:"New task created!",
            task:todo
        })
    } catch (error) {
        console.log("Error: ", error)         
    }
}

export const updateTodo = async(req,res)=>{
  const todoId = req.params.todoId
  const {title} = req.body

  const updatedTodo = await Todo.findByIdandUpdate(todoId, {title}, {new:true})
  await updatedTodo.save()

  return res.status(200).json({
    success:true,
    message:'Todo task updated successfully!'     
  })

}

export const getAllTodos = async (req,res)=>{
    const todos = await Todo.find()

    return res.status(200).json({
        "Tasks":todos || []
    })
}