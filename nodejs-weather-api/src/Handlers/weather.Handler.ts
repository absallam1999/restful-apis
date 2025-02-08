import { WeatherModel } from "../Models/weather.Model";
import Weather from "../Models/Types/Weather.Type";
import express from "express";

// Create Instance From Weather Model
const weatherModel = new WeatherModel();

// CREATE Weather Handler
export const addTemperature = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const response = await weatherModel.AddTemperature(req.body);
    res.status(200).json({
      status: "SUCCESS",
      weather: { response },
      message: "Weather Created Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// GET Weather Handler
export const getWeather = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const response = await weatherModel.GetWeather(
      req.params.id as unknown as number,
    );
    res.status(200).json({
      status: "SUCCESS",
      weather: { response },
      message: "Weather Fetched Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// UPDATE Weather Handler
export const updateWeather = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const weather: Weather = {
      high_temperature: req.body.high_temperature,
      low_temperature: req.body.low_temperature,
      country: req.body.country,
      description: req.body.description,
      id: req.params.id as unknown as number,
    };
    const response = await weatherModel.UpdateWeather(weather);
    res.status(200).json({
      status: "SUCCESS",
      weather: { response },
      message: "Weather Updated Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// Delete Weather Handler
export const destoryWeather = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const response = await weatherModel.DeleteWeather(
      req.params.id as unknown as number,
    );
    res.status(200).json({
      status: "SUCCESS",
      weather: { response },
      message: "Weather Deleted Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
