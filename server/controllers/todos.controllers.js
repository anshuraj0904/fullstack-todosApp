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
       
        const newTodo = {
            title:title,
            description:description
        }  
        return res.status(201).json({
            success:true,
            messsage:"New task created!",
            task:newTodo
        })
    } catch (error) {
        console.log("Error: ", error)         
    }
}

export const updateTodo = async(req,res)=>{
  try {
    const todoId = req.params.todoId
    const {title} = req.body
  
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, {title}, {new:true})
    await updatedTodo.save()
  
    return res.status(200).json({
      success:true,
      message:'Todo task updated successfully!'     
    })
  } catch (error) {
    console.log('Error: ', errorr);
    
  }

}

export const getAllTodos = async (req,res)=>{
    const todos = await Todo.find()

    return res.status(200).json({
        "Tasks":todos || []
    })
}


export const completedTask = async(req,res)=>{

    try {
        const todoId = req.params.todoId
           if (!mongoose.Types.ObjectId.isValid(todoId)) {
                return res.status(400).json({
                    success:false,
                    message: "Invalid ID format"
                })
            }
    
        const todo = await Todo.findById(todoId)
    
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Task not found!"
            })
        }
        
        if(todo.isCompleted === true)
        {
            return res.status(409).json({
                sucess:"Conflict",
                message:"This task is already completed!"
            })
        }
        todo.isCompleted = true
    
        await todo.save()
    
        return res.status(200).json({
            success:true,
            message:`${todo.title} completed successfully!`
        })
    } catch (error) {
      console.log("Error: ", error);
         
    }
}


export const deleteTodo = async(req,res)=>{
    try {
        const todoId = req.params.todoId

        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({
                success:false,
                message: "Invalid ID format"
            })
        }

    
        const deletedTodo = await Todo.findByIdAndDelete(todoId)
        if(!deletedTodo){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            })
        }
    
        return res.status(200).json({
            success:true,
            message:"Todo Deleted Successfully!"
        })
    } catch (error) {
        console.log("Error: ", error);
        
    }

}