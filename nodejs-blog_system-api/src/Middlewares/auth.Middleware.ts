import express, { NextFunction } from "express";
import config from "../Database/config";
import jwt from "jsonwebtoken";

const auth = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const verify = jwt.verify(token, config.token as string);
        if (verify) {
          next();
        } else {
          res.status(401).send("Error Authenticate");
        }
      } else {
        res.status(401).send("Error Authenticate");
      }
    } else {
      res.status(401).send("Error Authenticate");
    }
  } catch (err) {
    res.status(401).send(`Error ${err}`);
  }
};

export default auth;
