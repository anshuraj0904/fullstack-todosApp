import mongoose from "mongoose";


// The connection part, this is important:-
const DbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to database!`);
        

    } catch (error) {
        console.log(`Error connection to db : ${error}`);
        
    }
}

export default DbConnection