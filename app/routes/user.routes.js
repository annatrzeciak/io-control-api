const user = require("../controllers/user.controller");
const router = require("express").Router();
const { authJwt } = require("../middlewares");

module.exports = (app) => {
  router.get("/", user.findAll);

  app.use("/api/users", [authJwt.verifyToken, authJwt.isModerator], router);
};
