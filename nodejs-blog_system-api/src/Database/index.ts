import { Pool } from "pg";
import config from "./config";

// Create Instance From class Pool
const database = new Pool({
  port: parseInt(config.dbport as string),
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});

export default database;
