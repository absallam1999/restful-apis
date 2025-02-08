import express from "express";
import routes from "./Routes";
import logger from "./Middlewares/logger.Middleware";
import config from "./Database/config";
import helmet from "helmet";
import cors from "cors";

const app: express.Application = express();
const PORT: string = config.port as string;

app.use(
      helmet(),                      // Helmet Middleware
        cors(),                     //  Cors Middleware
          logger,                  //   Logger Middleware
            express.json()        //    JSON Parser
);

// Use Routes to '/api' path
app.use("/api", routes);

// Default Get Request
app.get("/", (_req: express.Request, res: express.Response): void => {
  res.send("Server Connected.");
});

// 404 Not Found Router
app.use((_req: express.Request, res: express.Response): void => {
  res.status(404).send({ status: 404, message: "404 Not Found!" });
});

// Server Listener
app.listen(PORT, (): void => {
  console.log(`SERVER STARTED at http://localhost:${PORT}`);
});

export default app;
