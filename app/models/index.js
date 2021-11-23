const dbConfig = require("../../config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.URL_MONGO;
db.user = require("./user.model.js")(mongoose);

module.exports = db;
