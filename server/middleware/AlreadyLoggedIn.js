import jwt from "jsonwebtoken"

export const isAlreadyLogged = async (req,res,next)=>{
    try {
        const access_token = req.cookies?.access_token
        
    
        if(access_token){
             try {
                const decoded =  jwt.verify(access_token, process.env.SECRET_ACCESS_TOKEN)
                const incomingEmail = req.body?.email
                // console.log(incomingEmail);
                
                if(decoded.email === incomingEmail){
                    return next()
                } 
                else{
                    return res.status(409).json({
                        success: false,
                        message: "Another user is already logged in. Please wait for him to logout!"
                    })
                }

             } catch (error) {
                       return next()                
             }
    } 
    else{
        return next()
    }
}
    catch (error) {
        console.log("Error", error);
        
    }
}