const { verifySignUp } = require("../middlewares");
const auth = require("../controllers/auth.controller");
const router = require("express").Router();

module.exports = function (app) {
  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/register",
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    auth.register
  );

  router.post("/login", auth.login);
  router.get("/user", auth.user);

  app.use("/api/auth", router);
};
