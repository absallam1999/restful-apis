import { PostsModel } from "../Models/posts.Model";
import Post from "../Models/Types/posts.Type";
import express from "express";

const PostModel = new PostsModel();

// CREATE Post Handler
export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const Post: Post = {
      text: req.body.text,
      Post: req.body.Post,
      public: req.body.public,
      user_id: req.params.id as unknown as number,
    };
    const response = await PostModel.CreatePost(Post);
    res.status(200).json({
      status: "SUCCESS",
      Post: response,
      message: "Post Created Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// GET Posts Handler
export const getPosts = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const response = await PostModel.GetPosts();
    res.status(200).json({
      status: "SUCCESS",
      Posts: response,
      message: "Posts Fetched Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// GET Spacific Post
export const getPost = async (req: express.Request, res: express.Response) => {
  try {
    const id: unknown = req.params.id;
    const response = await PostModel.getPost(id as number);
    res.status(200).json({
      status: "SUCCESS",
      Post: response,
      message: "Post Fetched Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// UPDATE Post Handler
export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const Post: Post = {
      text: req.body.text,
      Post: req.body.Post,
      public: req.body.public,
      id: req.params.id as unknown as number,
    };
    const response = await PostModel.UpdatePost(Post);
    res.status(200).json({
      status: "SUCCESS",
      Post: response,
      message: "Post Updated Successfully",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// DELETE Post Handler
export const destroyPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const response = await PostModel.DestroyPost(
      req.params.id as unknown as number
    );
    res.status(200).json({
      status: "SUCCESS",
      Post: response,
      message: "Post Deleted Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
