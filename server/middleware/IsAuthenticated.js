// Here, we'll create the authentication system for letting the user do things:-
import jwt from "jsonwebtoken" 

export const isAuthenticated = async(req,res,next)=>{
  try {
    const refresh_token = req.cookies?.refresh_token 

    
  
    if(!refresh_token){
      return res.status(401).json({
          success:false,
          message:"You are not authenticated to perform this task! Please login to do so!"
      })
    }
  
    const decode =  await jwt.verify(refresh_token,process.env.SECRET_REFRESH_TOKEN)
  
    if(!decode){
      return res.status(401).json({
          success:false,
          message:"User not authenticated to perform this task!"
      })
    }
  
     req.id = decode.userId
  
     next()
  } catch (error) {
    console.log("Error : ", error);
    
  }
}