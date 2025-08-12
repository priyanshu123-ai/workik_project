// RepoList.js
import React, { useState, useEffect } from "react";
import FileSelector from "../Pages/FileSelector";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false); // NEW: Track file loading state

  useEffect(() => {
    fetch("https://workik-project-1-backend.onrender.com/api/github/fetch-repos", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRepos(data.repos);
      })
      .catch((err) => console.error("Repo Fetch Error:", err));
  }, []);

  const handleSelectRepo = (repo) => {
    setSelectedRepo(repo);
    setLoadingFiles(true); // Start loading when repo is clicked
    setTimeout(() => setLoadingFiles(false), 1000); 
    // Simulate delay — remove if FileSelector handles actual fetch timing
  };

  const reposToDisplay = showAll ? repos : repos.slice(0, 8);

  return (
    <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 drop-shadow-lg text-cyan-400">
        📁 Your GitHub Repositories
      </h2>
      <ul className="space-y-3">
        {reposToDisplay.map((repo) => (
          <li
            key={repo.id}
            onClick={() => handleSelectRepo(repo)}
            className="p-3 bg-gray-700 rounded-xl cursor-pointer hover:bg-cyan-600 transition-all duration-300 hover:scale-[1.02] shadow-md"
          >
            {repo.full_name}
          </li>
        ))}
      </ul>

      {repos.length > 8 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-cyan-500 rounded-xl text-black font-semibold shadow-md hover:shadow-cyan-500/50 transition-all"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {/* Loading spinner */}
      {loadingFiles && (
        <div className="mt-4 text-center text-cyan-300 animate-pulse">
          ⏳ Fetching files...
        </div>
      )}

      {/* Show selected repo and file selector */}
      {selectedRepo && !loadingFiles && (
        <FileSelector
          owner={selectedRepo.owner.login}
          repo={selectedRepo.name}
        />
      )}
    </div>
  );
};

export default RepoList;
