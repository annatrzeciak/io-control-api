module.exports = app => {
    const user = require("../controllers/user.controller.js");

    const router = require("express").Router();

    // Create a new User
    router.post("/", user.create);

    router.get("/", user.findAll);

    app.use('/api/user', router);
};
