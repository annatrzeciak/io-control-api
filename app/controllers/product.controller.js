const db = require("../models");
const Product = db.product;
const debug = require("debug")("Product:controller");

exports.create = (req, res) => {};

exports.findAll = async (req, res) => {
  try {
    const result = await Product.find({});
    debug("Return all products");
    res.status(200).json({
      products: result.map((item) => item),
    });
  } catch (e) {
    res.status(500).send({
      message: "Error during get all products. " + e.message,
    });
  }
};

exports.search = async (req, res) => {
  try {
    const words = req.params.value
      .replace(/,/g, "")
      .split(" ")
      .filter((word) => word.length >= 3);
    let findParams;
    if (req.query.lang === "en") {
      findParams = words.map((word) => ({
        name: { $regex: word, $options: "ix" },
      }));
    } else {
      findParams = words.map((word) => ({
        namePl: { $regex: word, $options: "ix" },
      }));
    }
    if (!words.length) {
      res.status(400).send({
        message: "The minimum length is 3 characters",
      });
      return;
    }
    const result = await Product.find({
      $or: [...findParams],
    }).populate("details");
    debug("Return products by name");
    res.status(200).json({
      products: result.map((item) => item),
    });
  } catch (e) {
    res.status(500).send({
      message: "Error during get products. " + e.message,
    });
  }
};

// Find a single Product with an id
exports.findOne = (req, res) => {};

// Update a Product by the id in the request
exports.update = (req, res) => {};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {};
