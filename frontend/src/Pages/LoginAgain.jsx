import React from "react";

const LoginAgain = () => {
  const handleLoginAgain = () => {
    window.location.href = "https://workik-project.onrender.com/auth/logout";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      {/* Card Container */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-white/20 p-10 max-w-md w-full transform transition duration-500 hover:scale-[1.02]">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg text-center mb-6">
          Welcome to the App
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Connect with your GitHub account to get started.
        </p>

        {/* 3D Button */}
        <button
          onClick={handleLoginAgain}
          className="relative w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/50 transform hover:translate-y-[-2px] hover:scale-[1.03] transition-all duration-300 ease-out"
        >
          <span className="drop-shadow-md">🔑 Login Again with GitHub</span>
        </button>
      </div>

      {/* Glow Effect */}
      <div className="absolute bottom-10 text-gray-500 text-sm">
        © 2025 Your App. All rights reserved.
      </div>
    </div>
  );
};

export default LoginAgain;
