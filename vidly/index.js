const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const app = express();
const mongoose = require("mongoose");

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
  
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening to the port ${port}`);
});
