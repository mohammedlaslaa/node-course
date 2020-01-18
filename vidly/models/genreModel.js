const mongoose = require("mongoose");
const Joi = require("joi");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 6,
      maxlength: 50,
      required: true
    }
  })
);

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(6)
      .required()
  };

  return Joi.validate(genre, schema);
}


module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;