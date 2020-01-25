const mongoose = require("mongoose");
const winston = require("winston");

let datenow = new Date()

module.exports = function() {
  mongoose
    .connect("mongodb://localhost:27017/vidly", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => winston.info(`Connected to the database... ${datenow}`));
};
