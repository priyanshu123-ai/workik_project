// controller/githubController.js

import  GitHubUser  from "../models/githubUser.model.js"
import axios from "axios";

export const fetchAndSaveRepos = async (req, res) => {
  try {
    const user = await GitHubUser.findById(req.userId); // ✅ Get user by token

    if (!user) {
      return res.status(404).json({ message: "GitHub user not found" });
    }

    const token = user.githubToken;

    if (!token) {
      return res.status(400).json({ message: "GitHub token not found" });
    }

    const response = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const repos = response.data;
    return res.status(200).json({ success: true, repos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


export const fetchRepoFiles = async (req, res) => {
  const { owner, repo } = req.query;

  try {
    const user = await GitHubUser.findById(req.userId);
    const token = user.githubToken;

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    const files = response.data.filter(item => item.type === "file");

    res.status(200).json({ success: true, files });
  } catch (error) {
    console.error("GitHub file fetch error:", error?.response?.data || error.message);
    res.status(500).json({ success: false, message: "Failed to fetch files" });
  }
};

