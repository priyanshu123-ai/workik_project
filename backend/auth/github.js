// config/passport.js

import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import  GitHubUser  from "../models/githubUser.model.js"; // Make sure model is correctly named

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.APP_URL}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await GitHubUser.findOneAndUpdate(
          { githubId: profile.id },
          {
            githubId: profile.id,
            username: profile.username,
            githubToken: accessToken,
          },
          { upsert: true, new: true }
        );
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Corrected serialization logic
passport.serializeUser((user, done) => {
  done(null, user._id); // use _id from MongoDB
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await GitHubUser.findById(id); // Make sure this matches the GitHubUser model
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
