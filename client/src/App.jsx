import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import './App.css'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <div className="flex flex-col">
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
