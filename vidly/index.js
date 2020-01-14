const express = require("express");
const Joi = require("joi");
const genres = require('./routes/genres')
const app = express();

app.use(express.json());
app.use('/', genres);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening to the port ${port}`);
});
