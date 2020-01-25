const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();
const mongoose = require("mongoose");
const config = require("config");

if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/vidly", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to the database..."))
  .catch(err => console.error("Could not connect to mongodb...", err));

app.use(express.json());
app.use("/api/film/genres", genres);
app.use("/api/film/customers", customers);
app.use("/api/film/movies", movies);
app.use("/api/film/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 8050;

app.listen(port, () => {
  console.log(`Server listening to the port ${port}`);
});
