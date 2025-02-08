import express, { NextFunction } from "express";

const logger = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): void => {
  const url = req.url;
  const status = res.statusCode;
  const method = req.method;
  const protocol = req.protocol;
  const date = new Date();
  console.log(
    `\n URL Visited ${url} \n Status[${status}] - Method[${method}] - Protocol[${protocol}] \n Visited Date ${date.toLocaleString()}\n`
  );
  next();
};

export default logger;
