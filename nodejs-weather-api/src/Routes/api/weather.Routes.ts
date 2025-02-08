import express from "express";
import {
  addTemperature,
  getWeather,
  updateWeather,
  destoryWeather,
} from "../../Handlers/weather.Handler";

const weatherRouter = express.Router();

weatherRouter.post("/", addTemperature);
weatherRouter.get("/:id", getWeather);
weatherRouter.put("/:id", updateWeather);
weatherRouter.delete("/:id", destoryWeather);

export default weatherRouter;
