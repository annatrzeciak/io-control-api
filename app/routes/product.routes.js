const product = require("../controllers/product.controller");
const router = require("express").Router();
const { authJwt } = require("../middlewares");

module.exports = (app) => {
  router.get("/", [authJwt.verifyToken, authJwt.isModerator], product.findAll);

  app.use("/api/products", router);
};
