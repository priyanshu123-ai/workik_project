import mongoose from "mongoose";

const githubUserSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
  },
  githubToken: {
    type: String,
  },
  email: {
    type: String,
  },
  fullName: {
    type: String,
  },
}, {
  timestamps: true, // optional: adds createdAt and updatedAt fields
});

const GithubUser = mongoose.model("GithubUser", githubUserSchema);
export default GithubUser
