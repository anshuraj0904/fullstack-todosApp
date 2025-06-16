import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import Todos from '../components/Todos/Todos.jsx'
import './App.css'

function App() {

  return (
    <div className="flex flex-col">
      <Navbar/>
      <Todos/>
    </div>
  )
}

export default App
