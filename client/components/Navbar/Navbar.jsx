import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate()

  const handleLog = async () => {
    if (login) {
      const res = await fetch("http://localhost:8000/api/v1/user/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      navigate("/home");
      setLogin(false);
    } else {
      navigate("/login");
      setLogin(true);
    }
  };
  return (
    <div className="w-full shadow-md fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center bg-amber-500 px-6 py-3">
        <h1 className="text-white text-xl font-semibold tracking-wide">
          Welcome to the Todos app
        </h1>
        <div className="flex justify-end">

        <Button
          variant="outline"
          className="bg-white text-amber-500 hover:bg-amber-100 hover:text-white px-4 mx-2 py-2 rounded-md shadow-md"
          onClick={handleLog}
        >
          {login ? "Logout" : "Login"}
        </Button>
        {!login && (
            <Button
            variant="outline"
            className="bg-white text-amber-500 hover:bg-amber-100 hover:text-white px-4 py-2 rounded-md shadow-md"
            >
              <Link to={"/register"}>
            Register</Link>
          </Button>
        )}
              </div>
      </div>
    </div>
  );
}

export default Navbar;
