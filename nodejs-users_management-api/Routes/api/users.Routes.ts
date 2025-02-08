import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  destoryUser,
  authenticate
} from "../../Handlers/users.Handler";
// JWT Validate Authenticate Middleware
import auth from "../../Middlewares/auth.Middleware";

const usersRouter = express.Router();

usersRouter.post("/", createUser);
usersRouter.get("/:id", auth, getUser);
usersRouter.put("/:id", auth, updateUser);
usersRouter.post("/search", auth, getUsers);
usersRouter.delete("/:id", auth, destoryUser);
usersRouter.post("/authenticate", authenticate);

export default usersRouter;
