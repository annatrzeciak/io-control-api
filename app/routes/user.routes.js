const user = require("../controllers/user.controller");
const router = require("express").Router();
const { authJwt } = require("../middlewares");

module.exports = (app) => {
  router.get("/", [authJwt.verifyToken, authJwt.isModerator], user.findAll);

  app.use("/api/users", router);
};
