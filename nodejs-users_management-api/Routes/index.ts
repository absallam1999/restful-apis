import express from "express";
import usersRouter from "./api/users.Routes";

// Create Instance From Express.Router()
const routes = express.Router();

// Use usersRouter for path '/api/users'
routes.use("/users", usersRouter);

export default routes;
