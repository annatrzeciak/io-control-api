require("dotenv").config();

module.exports = {
  // MONGO CONFIG
  URL_MONGO: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-cr7xd.mongodb.net/pms?retryWrites=true&w=majority`,
};
