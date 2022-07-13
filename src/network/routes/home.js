import express from "express";

const { Router } = express;
import { response } from "../response.js";

const Home = Router();

Home.route("").get((req, res) => {
  response({
    error: false,
    message: "Welcome to Service 2 !",
    res,
    status: 200,
  });
});

export { Home };
