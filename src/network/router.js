import httpErrors from "http-errors";
import { response } from "./response.js";
import { Home, RawData } from "./routes/index.js";

const routers = [RawData];

const applyRoutes = (app) => {
  app.use("/", Home);
  routers.forEach((router) => app.use("/api", router));

  // Handling 404 error
  app.use((req, res, next) => {
    next(new httpErrors.NotFound("This route does not exists"));
  });
  app.use((error, req, res, next) => {
    return response({
      error: true,
      message: error.message,
      res,
      status: 400,
    });
  });
};
export { applyRoutes };
