import React from "react";

function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-amber-100 to-yellow-200 flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl font-extrabold text-amber-600 mb-4 text-center">
          Welcome to Todos App 📝
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl text-center">
          Organize your day, manage tasks efficiently, and never miss a deadline
          again. Let's get productive together!
        </p>
      </div>
    </div>
  );
}

export default Home;
