import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import passport from "passport";
import session from "express-session";
import cors from "cors";

// Database connection
import dbConnection from "./utils/database.js";

// Passport GitHub strategy
import "./auth/github.js";

// Routes
import userRouter from "./routes/User.route.js";
import responseRoute from "./routes/openai.route.js";
import githubRouter from "./routes/github.js";
import authRouter from "./routes/auth.js";

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to DB
dbConnection();

// CORS setup for frontend access
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend port
    credentials: true,
  })
);

// Session setup
app.use(
  session({
    secret: "github_oauth_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true only in production
      sameSite: "lax",
    },
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Mount routes
app.use("/auth", authRouter);             // GitHub OAuth routes
app.use("/api/user", userRouter);         // User-related routes
app.use("/api/github", githubRouter);     // GitHub repo & file API
app.use("/response", responseRoute);      // OpenAI response route

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
