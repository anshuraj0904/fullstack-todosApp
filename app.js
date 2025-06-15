import express from "express"
import dotenv from "dotenv"
import DbConnection from "./src/db/DbConnection.js"
import userRoutes from './src/routes/user.routes.js'
import bodyParser from "body-parser"
import todoRoutes from './src/routes/todo.routes.js' 
import cookieParser from "cookie-parser"

const app = express()  // Configuring the app using express.
dotenv.config() // dotenv configuration. Note:- For all the places where we need to use .env, we need to import those below this line.


DbConnection()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser()) // For getting the cookies in readable form. 


const port = process.env.PORT || 8000

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/todo', todoRoutes)


app.listen(port, ()=>{
    console.log('Listening on port: ',port)    
})