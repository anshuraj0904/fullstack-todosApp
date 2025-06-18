import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import "./App.css";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {

    const token = Cookies.get("refresh_token")
    if (token) {
      // console.log("Cookie is available and the user is logged in!");
      setLogin(true);
    }
    else{
      // console.log("Cookie is not available, user is not logged in.");
      setLogin(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, setLogin }}>
      <div className="flex flex-col">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
