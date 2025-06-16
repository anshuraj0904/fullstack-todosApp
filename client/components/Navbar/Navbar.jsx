import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function Navbar() {
  const [login, setLogin] = useState(false);

  return (
    <div className="w-full shadow-md fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center bg-amber-500 px-6 py-3">
        <h1 className="text-white text-xl font-semibold tracking-wide">
          Welcome to the Todos app
        </h1>
        <Button variant="outline" className="bg-white text-amber-500 hover:bg-amber-100 hover:text-white px-4 py-2 rounded-md shadow-md">
            {login ? "Logout" : "Login"}
            </Button>
      </div>
    </div>
  );
}

export default Navbar;
