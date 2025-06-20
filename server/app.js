import express from "express"
import dotenv from "dotenv"
import DbConnection from "./db/DbConnection.js"
import userRoutes from './routes/user.routes.js'
import bodyParser from "body-parser"
import todoRoutes from './routes/todo.routes.js' 
import cookieParser from "cookie-parser"
import cors from "cors"
import refreshroute from "./routes/refToken.routes.js"
import {Redis} from "ioredis"

const app = express()  // Configuring the app using express.
dotenv.config() // dotenv configuration. Note:- For all the places where we need to use .env, we need to import those below this line.

const RedisClient = new Redis();


DbConnection()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser()) // For getting the cookies in readable form. 
app.use(cors({
  origin: "http://localhost:5173", // our frontend origin
  credentials: true                // It allows cookies to be sent and set from backend to the front-end.
}));

// app.use()

const port = process.env.PORT || 8000


app.get('/getTodos', async (_, res)=>{
  try {
       const cacheddd_data = await RedisClient.get('posts')
       
       if(cacheddd_data !== null){
        console.log('Gawt it from the redis!');
        RedisClient.expire("posts",20);
        
        return res.json(JSON.parse(cacheddd_data))
       }
       else{

         const data = await fetch('https://jsonplaceholder.typicode.com/posts')
         const response = await data.json()
        
        console.log("Got it from endpoint!");
        
        await RedisClient.setex('posts',35, JSON.stringify(response))
         return res.status(200).json({
           success:true,
           message:response  
         })
        }
        // http://localhost:8000/getTodos

    
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success:false,
      status:404,
      message:error
    })
    
  }
})

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/todo', todoRoutes)
app.use('/api/v1', refreshroute)


app.listen(port, ()=>{
    console.log('Listening on port: ',port)    
})