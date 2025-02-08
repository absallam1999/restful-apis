import express from "express";
import routes from "./Routes";
import logger from "./Middlewares/logger.Middleware";
import config from "./Database/config";
import helmet from "helmet";
import cors from "cors";

const APP: express.Application = express();
const PORT: string = config.port as string;

APP.use(
    helmet(),                      // Helmet Middleware
      cors(),                     //  Cors Middleware
        logger,                  //   Logger Middleware
          express.json()        //    JSON Parser
);

APP.get("/", (_req: express.Request, res: express.Response): void => {
  res.status(200).send("Welcome.");
});

// Use Routes to '/api' path
APP.use("/api", routes);

// Default Get Request
APP.get("/", (_req: express.Request, res: express.Response): void => {
  res.status(200).send("Server Connected.");
});

// 404 Not Found Router
APP.use((_req: express.Request, res: express.Response): void => {
  res.status(404).send({ status: 404, message: "404 Not Found!" });
});

// Server Listener
APP.listen(PORT, (): void => {
  console.log(`SERVER STARTED at http://localhost:${PORT}`);
});

export default APP;
