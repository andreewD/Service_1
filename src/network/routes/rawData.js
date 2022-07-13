import { Router } from "express";
import { parseData } from "../controllers/index.js";

const RawData = Router();

RawData.route("/data").post((req, res, next) => {
  parseData(req, res, next);
});

export { RawData };
