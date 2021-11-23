const db = require("../models");
const User = db.user;

// Create and Save a new User
exports.create = (req, res) => {
  const response = validateEmailAccessibility(req.body.email);

  if (response) {
    if (req.body.password !== req.body.confirmPassword) {
      res.status(400).send({
        message: "Passwords do not match"
      });
      return;
    }

    User.create({ ...req.body }, (error, result) => {
      if (error) {
        res.status(500).send({
          message:
            error.message || "Some error occurred while creating the User"
        });
      } else {
        res.json({
          message: "The user has been created"
        });
      }
    });
  } else {
    res.status(409).send({ message: "User with email address already exists" });
  }
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  const response = await User.find({});
  console.log(response);
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

const validateEmailAccessibility = email => {
  return User.findOne({
    email
  }).then(result => !result);
};
