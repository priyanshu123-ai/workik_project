// FileSelector.js
import React, { useState, useEffect } from "react";

const FileSelector = ({ owner, repo }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [testCase, setTestCase] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!repo) return;
    fetch(`http://localhost:3000/api/github/repo-files?owner=${owner}&repo=${repo}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFiles(data.files);
        }
      });
  }, [repo]);

  const handleFileClick = async (file) => {
    setSelectedFile(file);
    setLoading(true);
    setTestCase("");
    const res = await fetch(file.download_url);
    const code = await res.text();

    const response = await fetch("http://localhost:3000/response/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Generate test cases for the following code:\n\n${code}`,
      }),
    });

    const result = await response.json();
    setTestCase(result.reply);
    setLoading(false);
  };

  return (
    <div className="h-screen bg-gray-900 text-white">
      {/* Left section could hold repo list if needed */}
      <div className="w-2/3 p-4 overflow-y-auto">
        <h3 className="text-lg font-bold mb-3">📄 Files in {repo}</h3>
        <ul className="mb-4">
          {files.map(file => (
            <li
              key={file.name}
              className="cursor-pointer text-blue-400 font-medium hover:underline"
              onClick={() => handleFileClick(file)}
            >
              {file.name}
            </li>
          ))}
        </ul>

        {loading && <p className="text-yellow-400 font-semibold">⏳ Generating test cases...</p>}

        {testCase && (
          <div className="bg-gray-800 p-3 rounded-lg mt-4 border border-gray-700">
            <h4 className="text-green-400 font-bold mb-2">✅ Generated Test Cases</h4>
            <pre className="whitespace-pre-wrap">{testCase}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileSelector;
