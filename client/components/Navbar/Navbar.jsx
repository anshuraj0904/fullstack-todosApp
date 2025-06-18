import React, { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { toast } from 'react-hot-toast';
import Cookies from "js-cookie";


function Navbar() {
  const navigate = useNavigate();
  const { login, setLogin } = useContext(AuthContext);
  
  useEffect(() => {
    const cookie = Cookies.get("refresh_token");
    if (cookie) {
      console.log("Cookie is available and the user is logged in!", cookie);
      setLogin(true);
    }
    else{
      console.log("Cookie is not available, user is not logged in.", cookie);
      
    }
  },[setLogin]); 
  

  const handleLogout = async () => {
    const res = await fetch("http://localhost:8000/api/v1/user/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    const data = await res.json();
    // console.log(data);
    if (data.success) {
      toast.success(data.message);
      navigate("/home");
      setLogin(false);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-amber-500 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <h1 className="text-white text-xl font-semibold tracking-wide">
          Welcome to the Todos App
        </h1>
        { login &&
          <Button
            className="bg-white text-amber-500 font-semibold hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </Button>
        }
      </div>
    </div>
  );
}

export default Navbar;
