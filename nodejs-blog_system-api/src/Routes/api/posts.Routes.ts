import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  destroyPost
} from "../../Handlers/posts.Handler";

const postsRouter = express.Router();

postsRouter.delete("/:id", destroyPost);
postsRouter.post("/:id", createPost);
postsRouter.put("/:id", updatePost);
postsRouter.get("/:id", getPost);
postsRouter.get("/", getPosts);

export default postsRouter;
