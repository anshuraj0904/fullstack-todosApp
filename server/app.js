import express from "express"
import dotenv from "dotenv"
import DbConnection from "./db/DbConnection.js"
import userRoutes from './routes/user.routes.js'
import bodyParser from "body-parser"
import todoRoutes from './routes/todo.routes.js' 
import cookieParser from "cookie-parser"
import cors from "cors"
import refreshroute from "./routes/refToken.routes.js"

const app = express()  // Configuring the app using express.
dotenv.config() // dotenv configuration. Note:- For all the places where we need to use .env, we need to import those below this line.


DbConnection()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser()) // For getting the cookies in readable form. 
app.use(cors({
  origin: "http://localhost:5173", // our frontend origin
  credentials: true                // It allows cookies to be sent and set from backend to the front-end.
}));

const port = process.env.PORT || 8000

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/todo', todoRoutes)
app.use('/api/v1', refreshroute)


app.listen(port, ()=>{
    console.log('Listening on port: ',port)    
})