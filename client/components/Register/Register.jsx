import React, {useState} from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
      "fullName":"",
      "email":"",
      "password":"" 
    })

    const registerUser = async(e)=>{
       e.preventDefault()
       const response = await fetch("http://localhost:8000/api/v1/user/register",{
           method:"POST",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
            fullName:credentials.fullName,
            email:credentials.email,
            password:credentials.password}),
           credentials:"include"
       })  

       const data = await response.json()
       if(!data.success){
        toast.error(data.message)
        setCredentials({
          fullName:"",
          email:"",
          password:""
        })
       }

       else{
        toast.success(data.message)
        setCredentials({
          fullName:"",
          email:"",
          password:""
        })
        navigate("/login")
       }
    }
  return (
        <div className="mt-20 flex items-center rounded-md justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>

        <form className="space-y-4">
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="fullName">
                    Full Name
                </label>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    value={credentials.fullName}
                    name="fullName"
                    onChange={(e) => setCredentials({...credentials, [e.target.name]: e.target.value})}
                />
            </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={credentials.email}
                name="email"
               onChange={(e) => setCredentials({...credentials, [e.target.name]: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              name="password"
              onChange={(e) => setCredentials({...credentials, [e.target.name]: e.target.value})} 
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition-all duration-200"
            onClick={registerUser}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}


export default Register