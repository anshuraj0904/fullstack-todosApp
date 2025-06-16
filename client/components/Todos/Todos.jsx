import React, {useState} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Todos() {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    

    const addTodo = async()=>{
        const res = await fetch('http://localhost:8000/api/v1/todo/addTodo',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
           },
           body:JSON.stringify({title,description}),
             credentials: "include" // For cookies to be sent.

        })

        const data = await res.json()
       
        if(data.success){
            console.log(data.message);
            setTitle('')
            setDescription('')
          }

          else{
            console.log(data.message);
            
          }
    }

  return (
    <div className="mt-12 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Add a New Task
        </h2>

        <Input
          type="text"
          placeholder="Enter the task"
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <Textarea
          placeholder="Enter the description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
          rows={4}
          value={description}
          onChange={(e)=>{setDescription(e.target.value)}}
        />

        <Button className="w-full bg-amber-500 text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition-all duration-200"
          onClick={addTodo}>
          Add Todo
        </Button>
      </div>
    </div>
  );
}

export default Todos;
