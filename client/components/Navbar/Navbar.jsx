import React, { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();
  const { login, setLogin } = useContext(AuthContext);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/refresh", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          // Set login to true since refresh_token is valid
          setLogin(true);
          console.log("Refresh access token found, user is logged in")
        } else {
          console.warn("Refresh token invalid or expired, user might have logged out!");
          setLogin(false);
        }
      } catch (err) {
        console.error("Error refreshing token", err);
        setLogin(false);
      }
    };

    getAccessToken();
  }, [login]);

  const handleLogout = async () => {
    const res = await fetch("http://localhost:8000/api/v1/user/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
        {login && (
          <Button
            className="bg-white text-amber-500 font-semibold cursor-pointer hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
