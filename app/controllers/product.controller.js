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

// Find a single Product with an id
exports.findOne = (req, res) => {};

// Update a Product by the id in the request
exports.update = (req, res) => {};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {};
