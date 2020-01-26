const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/database")();
require("./startup/logging")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 8200;

const server = app.listen(port, () => {
  winston.info(`Server listening to the port ${port}`);
});

module.exports = server;
 