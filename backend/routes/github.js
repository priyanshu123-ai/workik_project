import express from "express";
import { fetchAndSaveRepos } from "../controller/githubController.js";
import { isAuth } from "../middleware/isAuthenticated.js";
import { fetchRepoFiles } from "../controller/githubController.js";

const router = express.Router();

router.get("/fetch-repos",isAuth,fetchAndSaveRepos); // or try removing isAuth temporarily
router.get("/repo-files", isAuth, fetchRepoFiles);
export default router;
