import express from "express"
import { generateResponse } from "../controller/openai.controller.js";

const responseRoute = express.Router();

responseRoute.post("/generate",generateResponse)


export default responseRoute

