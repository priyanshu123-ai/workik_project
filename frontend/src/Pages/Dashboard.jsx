import React from "react";
import RepoList from "../component/RepoList";
import FileSelector from "../Pages/FileSelector";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLoginAgain = async () => {
    await fetch("https://workik-project.onrender.com/auth/logout", {
      credentials: "include",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold drop-shadow-lg">📊 Dashboard</h2>
        <button
          onClick={handleLoginAgain}
          className="bg-red-600 px-5 py-2 rounded-xl hover:bg-red-700 shadow-lg hover:shadow-red-500/50 transition-all duration-300"
        >
          Login Again
        </button>
      </div>

      <div className="grid gap-6">
        <RepoList />
        <FileSelector />
      </div>
    </div>
  );
};

export default Dashboard;
