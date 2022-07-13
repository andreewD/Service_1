import express from "express";
import cors from "cors";
import pino from "express-pino-logger";
import { applyRoutes } from "./network/index.js";
const PORT = process.env.PORT || 1997;

class Server {
  constructor() {
    this.app = express();
    this.log = pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    });
    this.#config();
  }

  #config() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
      next();
    });
    applyRoutes(this.app)
  }

  start() {
    this.app.listen(PORT, () => {
      this.log.logger.info(`Server running at port ${PORT}`);
    });
  }
}

const server = new Server();

export { server as Server };
