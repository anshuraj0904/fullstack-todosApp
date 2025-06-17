import mongoose from "mongoose";
import { User } from "./user.models.js";


const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false
    }
})


export const Todo = new mongoose.model("Todo", todoSchema)