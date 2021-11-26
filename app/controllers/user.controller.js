const db = require("../models");
const User = db.user;
const debug = require("debug")("user:controller");

exports.create = (req, res) => {
  debug("POST /user");

  if (req.body.password !== req.body.confirmPassword) {
    debug("Passwords do not match");
    res.status(400).send({
      message: "Passwords do not match",
    });
    return;
  }

  User.create({ ...req.body }, (error, result) => {
    if (error) {
      debug(error.message || "Some error occurred while creating the User");
      res.status(500).send({
        message: error.message || "Some error occurred while creating the User",
      });
    } else {
      debug("The user has been created");
      res.json({
        message: "The user has been created",
      });
    }
  });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  const response = await User.find({});
};

// Find a single User with an id
exports.findOne = (req, res) => {};

// Update a User by the id in the request
exports.update = (req, res) => {};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {};

// Find all published Users
exports.findAllPublished = (req, res) => {};
