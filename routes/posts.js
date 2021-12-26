import express from "express";
import { createPost, getPosts } from "../controllers/posts.js";

const router = express.Router();

// using url http://localhost:5000/posts
// with routes here
// Eg: http://localhost:5000/posts/create => tao new post
router.get("/", getPosts);
router.post("/", createPost);
export default router;
