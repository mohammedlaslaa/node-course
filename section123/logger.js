const EventEmitter = require("events");

var url = "http://mylooger.io/log";

class Logger extends EventEmitter{
  log(message) {
    // send http request 'example'
    console.log(message);

    // Raise an event
    this.emit("messageLogged", {
      id: 1,
      url: "http://"
    });
  }
}

module.exports = Logger;
// module.exports.endPoint = url; example renaming


