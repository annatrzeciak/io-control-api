const dbConfig = require("../../config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.URL_MONGO;
db.user = require("./user.model.js")(mongoose);
db.role = require("./role.model.js")(mongoose);
db.product = require("./product.model.js")(mongoose);
db.detail = require("./detail.model.js")(mongoose);
db.calculation = require("./calculation.model.js")(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
