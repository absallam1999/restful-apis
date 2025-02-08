import express from "express";
import weatherRouter from "./api/weather.Routes";

// Create Instance From Express.Router()
const routes = express.Router();

// Use usersRouter for path '/api/users'
routes.use("/weather", weatherRouter);

export default routes;
