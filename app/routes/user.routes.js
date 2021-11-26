const user = require("../controllers/user.controller");
const router = require("express").Router();

module.exports = (app) => {
  router.get("/", user.findAll);

  app.use("/api/user", router);
};
