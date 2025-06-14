import { User } from "../models/user.models.js"
import bcrypt from "bcrypt"
import validator from "validator"

export const register = async(req, res)=>{
    try {
        const {fullName, email, password} = req.body
        if(!fullName || !email || !password){
            return res.status(404).json({
                success:false,
                message:"One or more fields is missing!"
            })
        }

        if(!validator.isEmail(email)){
            return res.status(409).json({success:false, message:"Please enter a valid email!"})
        }


        const user = await User.findOne({email})

        if(user){
            return res.status(409).json({
                success:false,
                message:"User already exists!"
            })
        }
       
        const hashedPass = await bcrypt.hash(password, 10)
       await User.create({
        fullName:fullName,
        email:email,
        password:hashedPass
       })        


       return res.status(201).json({
        success:true,
        message:"User created successfully!"
       })
    } catch (error) {
        console.log(error);
        
    }
} 



export const login = async(req,res)=>{
    try {
        const {email, password} = req.body
        if(!email || !password)
        {
            return res.status(404).json({
                success:false,
                message:"Enter valid credentials!"
            })
        }
    
        const user = await User.findOne({email})
    
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User doesn't exist!"
            })
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password) // compare takes the user entered password as the first paramter, and that saved in the db as the second one. Returns a boolean value.

        if(!passwordMatch){
            return res.status(403).json({
                success:false,
                message:"Inccorect Password!"
            })
        }


        const userData = await User.findById(user._id).select(
            "-password"
        )
        return res.status(200).json({
            success:true,
            message:"Logged in successfully!",
            "User Details":userData
        })

    } catch (error) {
        console.log("Error in logging in:", error);
        
    }
}