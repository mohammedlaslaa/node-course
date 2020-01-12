const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

const genres = [
  {
    id: 0,
    name: "Horror"
  },
  {
    id: 1,
    name: "Action"
  },
  {
    id: 2,
    name: "Adventure"
  }
];

app.get("/api/film/genres", (req, res) => {
  res.send(genres);
});

app.post("/api/film/genres", (req, res) => {
  //   const newsGenre = req.params.
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newsGenre = {
    id: genres.length,
    name: req.body.name
  };

  genres.push(newsGenre);

  res.send(newsGenre);
});

app.put("/api/film/genres/:id", (req, res) => {
  const id = req.params.id;
  const retrieve = genres.findIndex(el => el.id == id);

  if (retrieve < 0)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  genres[retrieve].name = req.body.name;

  res.status(200).send(genres);
});

app.delete("/api/film/genres/:id", (req, res) => {
  const id = req.params.id;
  const retrieve = genres.findIndex(el => el.id == id); //indexOf

  if (retrieve < 0)
    return res.status(404).send("The genre with the given ID was not found.");

  genres.splice(retrieve, 1);

  res.send("This genre is now deleted");
});

app.get("/api/film/genres/:id", (req, res) => {
  const retrieve = genres.findIndex(el => el.id == req.params.id);
  if (retrieve < 0)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genres);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening to the port ${port}`);
});
