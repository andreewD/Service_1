import httpErrors from "http-errors";
import { response } from "./response.js";
import { Home } from "./routes/index.js";

const routers = [];

const applyRoutes = (app) => {
  app.use("/", Home);
  routers.forEach((router) => app.use("/api", router));

  // Handling 404 error
  app.use((req, res, next) => {
    next(new httpErrors.NotFound("This route does not exists"));
  });
  app.use((error, req, res, next) => {
    response({
      error: true,
      message: error.message,
      res,
      status: error.status,
    });
    next();
  });
};
export { applyRoutes };
