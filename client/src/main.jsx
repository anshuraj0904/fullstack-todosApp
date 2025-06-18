import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Register from '../components/Register/Register.jsx'
import Home from '../components/Home/home.jsx'
import Login from '../components/Login/Login.jsx'
import Todos from '../components/Todos/Todos.jsx'

const appRouter = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<App />} >
      <Route index element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/todos' element={<Todos/>}/>
      <Route path='/home' element={<Home/>}/> 
      </Route>
  )
)

createRoot(document.getElementById('root')).render(
        <RouterProvider router={appRouter} />
)
