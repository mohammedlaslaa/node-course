const logger = require("./logger");
const loggi = require("./loggi");

console.log(logger);
console.log(loggi);

logger.log('message'); // Object returned by logger
loggi('heyy') // function returned by loggi
