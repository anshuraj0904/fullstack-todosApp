import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "../../context/AuthContext.js"
import { Cookie } from "lucide-react";
import toast from "react-hot-toast";

function Todos() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [todos, setTodos] = useState([]);

  

  const addTodo = async () => {
    const res = await fetch("http://localhost:8000/api/v1/todo/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
      credentials: "include", // For cookies to be sent.
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      // Update the todos state with the new task
      setTodos((prevTodos) => [...prevTodos, data.task]);

      setTitle("");
      setDescription("");
    } else {
      toast.error(data.message);
      setTitle("");
      setDescription("");
    }
  };

  // Fetch todos on component render:-
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("http://localhost:8000/api/v1/todo/getTodos", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log("data", data);
      setTodos(data.tasks);
    };

    fetchTodos();
  }, []);


  const deleteTodo = async (todoId) => {
    const res = await fetch(`http://localhost:8000/api/v1/todo/deleteTodo/${todoId}`, {
      method:"DELETE",
      credentials: "include"
    })
    const data = await res.json();
    if(data.success){
      toast.success(data.message);
      // Remove the deleted todo from the state
      setTodos((prevTodos)=> prevTodos.filter(todo => todo._id !== todoId));
    }
    else{
      toast.error(data.message);
    }

  }

  const editTodo = async (todoId) => {
    const res = await fetch(`http://localhost:8000/api/v1/todo/updateTodo/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title}),
      credentials: "include",
    })

    const data = await res.json();

    if(data.success) {
      toast.success(data.message);
      // Update the todos state with the edited task
      setTodos((prevTodos) => prevTodos.map(todo => todo._id === todoId ? {...todo, title} : todo));
      setTitle("");
    }
    else {
      toast.error(data.message);
      setTitle("");
    }
  }

  return (
    <div className="mt-12 flex flex-col items-center w-full space-y-10">
      {/* ➕ Add New Task Form */}
      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          ➕ Add a New Task
        </h2>

        <Input
          type="text"
          placeholder="Enter the task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <Textarea
          placeholder="Enter the description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          className="w-full bg-amber-500 text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition-all duration-200"
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </div>

      {/* 🧾 Tasks in Horizontal Row */}
      {todos?.length === 0 ? (
        <h1 className="text-3xl font-bold text-gray-800">No tasks to show</h1>
      ) : (
        <div className="flex flex-row gap-6 overflow-x-auto w-full px-4 py-2">
          {todos.map((todo, index) => (
            <div
              key={todo._id}
              className="min-w-[320px] max-w-sm bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  🚀 <span className="truncate">{todo.title}</span>
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm" key={index}>
                {todo.description || "No description provided."}
              </p>

              {/* Footer Buttons */}
              <div className="flex ietms-center gap-3 mt-6">
                <Button
                  className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm cursor-pointer hover:bg-blue-600 transition-shadow shadow-sm hover:shadow-md"
                  variant="outline"
                  onClick={()=>editTodo(todo._id)}
                >
                  ✏️ Edit
                </Button>
                <Button
                  className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm cursor-pointer hover:bg-red-600 transition-shadow shadow-sm hover:shadow-md"
                  variant="outline"
                  onClick={() => deleteTodo(todo._id)}
                >
                  🗑️ Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
