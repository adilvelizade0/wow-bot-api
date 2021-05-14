const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env/.env" });

const url = process.env.DB_URL;

module.exports = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on("open", () => {
    console.log("MongoDB: Connected");
  });
  mongoose.connection.on("error", () => {
    console.log("MongoDB: Error", err);
  });
  mongoose.Promise = global.Promise;
};
