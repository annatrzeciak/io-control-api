const calculation = require("../controllers/calculation.controller");
const router = require("express").Router();
const { authJwt } = require("../middlewares");

module.exports = (app) => {
  router.get("/", [authJwt.verifyToken], calculation.findAll);
  router.post("/", [authJwt.verifyToken], calculation.create);
  router.put("/:id", [authJwt.verifyToken], calculation.update);

  app.use("/api/calculations", router);
};
