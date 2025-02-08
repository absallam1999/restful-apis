import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  destoryUser,
  authenticate,
  addImage,
} from "../../Handlers/users.Handler";
import auth from "../../Middlewares/auth.Middleware";

const usersRouter = express.Router();

usersRouter.post("/", createUser);
usersRouter.get("/:id", auth, getUser);
usersRouter.put("/:id", auth, updateUser);
usersRouter.post("/search", auth, getUsers);
usersRouter.delete("/:id", auth, destoryUser);
usersRouter.post("/authenticate", authenticate);
usersRouter.post("/:id/userimage", auth, addImage);

export default usersRouter;
