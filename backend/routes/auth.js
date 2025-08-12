import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import GitHubUser from "../models/githubUser.model.js";

const router = express.Router();

router.get("/github", passport.authenticate("github", { scope: ["user:email", "repo"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { userId: user._id, githubToken: user.githubToken },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.redirect("http://localhost:5173/dashboard");
  }
);

// ✅ Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.logout(() => {
    res.status(200).json({ message: "Logged out" });
  });
});

export default router;
