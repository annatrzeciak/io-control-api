const db = require("../models");
const Calculation = db.calculation;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Missing calculation data",
    });
    return;
  }
  Calculation.create(
    {
      ...req.body,
      userId: req.userId,
    },
    (error, result) => {
      if (error) {
        res.status(500).send({
          message:
            error.message ||
            "Some error occurred while creating the Calculation",
        });
      } else {
        res.json({
          message: "The Calculation has been created",
        });
      }
    }
  );
};

exports.findAll = (req, res) => {
  Calculation.find({ userId: req.userId })
    .populate({
      path: "product",
      model: "product",
      populate: [
        {
          path: "details",
          model: "detail",
        },
      ],
    })
    .exec((err, result) => {
      if (err) {
        res.status(500).send({
          message: "Error during get all user calculations. " + err.message,
        });
        return;
      }
      res.status(200).json({
        calculations: result.map((item) => item),
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {};

// Update a Calculation
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Missing calculation data",
    });
    return;
  }
  Calculation.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      updatedAt: new Date(),
    },
    (error, result) => {
      if (error) {
        res.status(500).send({
          message:
            error.message ||
            "Some error occurred while updating the Calculation",
        });
      } else {
        res.json({
          message: "The Calculation has been updated",
        });
      }
    }
  );
};
// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Missing calculation id",
    });
    return;
  }

  Calculation.deleteOne(
    { _id: req.params.id, userId: req.userId },
    (error, result) => {
      if (error) {
        res.status(500).send({
          message: "Could not delete Calculation with id=" + req.params.id,
        });
        return;
      }
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Calculation with id=${req.params.id}. Maybe Calculation was not found!`,
        });
      } else {
        res.send({
          message: "Calculation was deleted successfully!",
        });
      }
    }
  );
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {};

// Find all published Users
exports.findAllPublished = (req, res) => {};
